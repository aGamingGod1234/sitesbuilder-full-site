import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = ['/', '/work/', '/pricing/', '/process/', '/contact/', '/free-preview/'];

for (const route of routes) {
  test(`${route} renders without overflow`, async ({ page }, testInfo) => {
    if (testInfo.project.name === 'reduced-motion') await page.emulateMedia({ reducedMotion: 'reduce' });
    const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
    expect(response?.ok(), `${route} should return HTTP 2xx`).toBeTruthy();
    await expect(page.locator('main')).toBeVisible();
    await expect(page).toHaveTitle(/\S+/);

    const horizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
    );
    expect(horizontalOverflow, `${route} should not overflow horizontally`).toBeFalsy();

    if (testInfo.project.name !== 'no-js') {
      const results = await new AxeBuilder({ page }).disableRules(['color-contrast']).analyze();
      expect(results.violations.filter((item) => ['critical', 'serious'].includes(item.impact ?? ''))).toEqual([]);
    }
  });
}

test('contact destinations use the approved Local Web Works details', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const whatsapp = page.locator('a[href*="wa.me/6591616337"]').first();
  await expect(whatsapp).toHaveAttribute('href', /wa\.me\/6591616337\?text=/);

  await page.goto('/contact/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('a[href^="mailto:contact@sitesbuilder.store"]').first()).toBeVisible();
});

test('portfolio links identify Eraspace and Sarathy', async ({ page }) => {
  await page.goto('/work/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('a[href^="https://eraspace.sg"]').first()).toBeVisible();
  await expect(page.locator('a[href^="https://sarathyv2-web-production.up.railway.app"]').first()).toBeVisible();
});
