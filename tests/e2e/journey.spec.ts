import { expect, test } from '@playwright/test';

const sleep = (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));

test('forward and reverse homepage journey remains stable', async ({ page }, testInfo) => {
  await page.addInitScript(() => {
    const state = { longTasks: [] as number[] };
    // @ts-expect-error test-only state
    window.__journeyMetrics = state;
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) state.longTasks.push(entry.duration);
      });
      try { observer.observe({ type: 'longtask', buffered: true }); } catch {}
    }
  });

  await page.goto('/', { waitUntil: 'networkidle' });
  const sections = page.locator('main section');
  const count = await sections.count();
  expect(count).toBeGreaterThan(1);

  for (let pass = 0; pass < 2; pass += 1) {
    for (let index = 0; index < count; index += 1) {
      await sections.nth(index).scrollIntoViewIfNeeded();
      await sleep(40);
    }
    for (let index = count - 1; index >= 0; index -= 1) {
      await sections.nth(index).scrollIntoViewIfNeeded();
      await sleep(40);
    }
  }

  const metrics = await page.evaluate(() => {
    // @ts-expect-error test-only state
    const state = window.__journeyMetrics ?? { longTasks: [] };
    return {
      url: location.href,
      sections: document.querySelectorAll('main section').length,
      horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      longTasks: state.longTasks,
      rendererCanvases: document.querySelectorAll('canvas').length
    };
  });

  expect(metrics.horizontalOverflow).toBeFalsy();
  await testInfo.attach('journey-metrics', {
    body: Buffer.from(JSON.stringify(metrics, null, 2)),
    contentType: 'application/json'
  });
});
