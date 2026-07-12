import { chromium } from '@playwright/test';
import { createHash } from 'node:crypto';
import { mkdir, readFile, stat, unlink, writeFile } from 'node:fs/promises';
import sharp from 'sharp';
import path from 'node:path';

const outputDir = path.resolve('public/assets/portfolio-v3');
const tempDir = path.resolve('artifacts/qa/local/proof-source');
await mkdir(outputDir, { recursive: true });
await mkdir(tempDir, { recursive: true });
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });

async function dismiss(page) {
  for (const pattern of [/accept/i, /close/i, /dismiss/i, /no thanks/i]) {
    const button = page.getByRole('button', { name: pattern }).first();
    if (await button.isVisible().catch(() => false)) await button.click().catch(() => {});
  }
}

async function capture({ project, sourceURL, primary, detail, labels }) {
  const page = await context.newPage();
  await page.goto(sourceURL, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  await page.waitForTimeout(3_000);
  await dismiss(page);
  const targets = [['primary', primary(page)], ['detail', detail(page)]];
  const records = [];
  for (const [kind, locator] of targets) {
    await locator.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const base = `${project.toLowerCase()}-${kind}`;
    const source = path.join(tempDir, `${base}.png`);
    const filename = `${base}.webp`;
    const absolute = path.join(outputDir, filename);
    if (project === 'Eraspace' && kind === 'detail') {
      const clip = await locator.evaluate((element) => ({
        x: 0,
        y: Math.max(0, element.getBoundingClientRect().top + window.scrollY - 220),
        width: Math.min(1440, document.documentElement.scrollWidth),
        height: 600
      }));
      await page.screenshot({ path: source, animations: 'disabled', clip });
    } else {
      await locator.screenshot({ path: source, animations: 'disabled' });
    }
    await sharp(source).webp({ quality: 82, effort: 5 }).toFile(absolute);
    await unlink(source);
    const buffer = await readFile(absolute);
    const details = await stat(absolute);
    const metadata = await sharp(absolute).metadata();
    records.push({ kind, path: `/assets/portfolio-v3/${filename}`, width: metadata.width, height: metadata.height, bytes: details.size, compression: 'WebP quality 82 effort 5', sha256: createHash('sha256').update(buffer).digest('hex'), alt: labels[kind] });
  }
  await page.close();
  return { project, sourceURL, capturedAt: new Date().toISOString(), viewport: { width: 1440, height: 900 }, thirdPartyContentReview: 'pending-human-pixel-review', records };
}

const manifest = [
  await capture({
    project: 'Eraspace',
    sourceURL: 'https://eraspace.sg/',
    primary: (page) => page.locator('main > :first-child'),
    detail: (page) => page.locator('main > *').nth(1),
    labels: { primary: 'Eraspace consumer-electronics storefront hero.', detail: 'Eraspace product collection discovery section.' }
  }),
  await capture({
    project: 'Sarathy',
    sourceURL: 'https://sarathyv2-web-production.up.railway.app/',
    primary: (page) => page.getByRole('heading', { name: 'We organize the chaos of finance' }).locator('..').locator('..'),
    detail: (page) => page.getByRole('heading', { name: 'Core app features' }).locator('..').locator('..'),
    labels: { primary: 'Sarathy student-finance MVP landing-page hero.', detail: 'Sarathy MVP core app features section.' }
  })
];

await writeFile(path.join(outputDir, 'manifest.json'), JSON.stringify({ generatedAt: new Date().toISOString(), permissionStatus: { Eraspace: 'internal-owner-attestation', Sarathy: 'lucas-attestation-original-client-record-pending' }, captures: manifest }, null, 2));
await browser.close();
console.log(JSON.stringify({ captures: manifest.flatMap((entry) => entry.records).length, outputDir }));
