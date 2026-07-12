import { access, mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const releaseId = process.env.RELEASE_ID ?? 'local-phase0';
const root = path.resolve('artifacts');
const now = new Date().toISOString();
const readJson = async (relative) => JSON.parse(await readFile(path.join(root, relative), 'utf8'));
const nonEmpty = async (relative) => {
  try { return (await stat(path.join(root, relative))).size > 0; } catch { return false; }
};
const exists = async (relative) => {
  try { await access(path.join(root, relative)); return true; } catch { return false; }
};

const playwrightPath = 'qa/local/playwright-results.json';
const lighthousePath = 'benchmarks/local/summary.json';
const bundlePath = 'benchmarks/local/bundle-summary.json';
const placeholderPath = 'qa/local/legal/placeholder-scan.json';

let playwright;
let lighthouse;
let bundle;
let placeholders;
try { playwright = await readJson(playwrightPath); } catch {}
try { lighthouse = await readJson(lighthousePath); } catch {}
try { bundle = await readJson(bundlePath); } catch {}
try { placeholders = await readJson(placeholderPath); } catch {}

const allBrowserTestsPassed = Boolean(
  playwright?.stats?.expected >= 36 && playwright.stats.unexpected === 0 && playwright.stats.skipped === 0
);
const projectNames = new Set(playwright?.config?.projects?.map((project) => project.name) ?? []);
const browserEvidence = {
  all: allBrowserTestsPassed,
  noJs: allBrowserTestsPassed && projectNames.has('no-js'),
  reducedMotion: allBrowserTestsPassed && projectNames.has('reduced-motion')
};

const definitions = [
  ['BUILD-001', await nonEmpty('qa/local/check.txt'), 'npm run check', 'qa/local/check.txt', 'Astro/type check evidence'],
  ['BUILD-002', await nonEmpty('qa/local/build.txt'), 'npm run build', 'qa/local/build.txt', 'Production build evidence'],
  ['UNIT-001', await nonEmpty('qa/local/unit.txt'), 'npm run test:unit', 'qa/local/unit.txt', 'Unit-test evidence'],
  ['E2E-001', browserEvidence.all, 'npm run test:e2e', playwrightPath, '36-test browser suite'],
  ['E2E-002', false, 'package-links test', 'qa/local/playwright/package-links.json', 'Dedicated package/care-link matrix not implemented'],
  ['E2E-003', false, 'keyboard-nav test', 'qa/local/playwright/keyboard/', 'Dedicated keyboard/focus-order suite not implemented'],
  ['E2E-004', false, 'history-resize test', 'qa/local/playwright/history-resize/', 'History/orientation state suite not implemented'],
  ['FALLBACK-001', browserEvidence.noJs, 'playwright --project=no-js', playwrightPath, 'Basic no-JS route/contact/proof checks'],
  ['FALLBACK-002', browserEvidence.reducedMotion, 'playwright --project=reduced-motion', playwrightPath, 'Basic reduced-motion route/contact/proof checks'],
  ['FALLBACK-003', false, 'save-data enhancement test', 'qa/local/playwright/save-data/', 'Save-Data/failed-enhancement test not implemented'],
  ['LIFE-001', false, 'lifecycle boundary instrumentation', 'qa/local/lifecycle/boundary.json', 'Renderer lifecycle instrumentation awaits prototype'],
  ['A11Y-001', false, 'axe all public routes', playwrightPath, 'Axe serious/critical checks run, but color-contrast is disabled; full gate not yet met'],
  ['PERF-001', lighthouse?.passed === true, 'npm run benchmark:lighthouse', lighthousePath, lighthouse ? 'Median LCP/CLS/TBT gate' : 'No Lighthouse summary'],
  ['PERF-002', Array.isArray(bundle?.failures) && bundle.failures.length === 0, 'npm run benchmark:bundle', bundlePath, 'Compressed transfer budget'],
  ['VIS-001', false, 'visual suite', 'qa/local/visual/', 'Visual-diff suite not implemented'],
  ['SEO-001', false, 'SEO route test', 'qa/local/seo/routes.json', 'Metadata/schema route matrix not implemented'],
  ['MIGRATE-001', false, 'redirect test', 'qa/local/seo/migration.json', 'Old-to-new redirect test not implemented'],
  ['LEGAL-001', Array.isArray(placeholders?.findings) && placeholders.findings.length === 0, 'npm run qa:placeholders', placeholderPath, 'Built-output placeholder scan'],
  ['TRUTH-001', false, 'content truth scan', 'qa/local/truth/content.json', 'Production-copy truth matrix not implemented']
];

const items = definitions.map(([id, passed, command, evidencePath, notes]) => ({
  id,
  status: passed ? 'pass' : 'fail',
  command_or_script: command,
  environment: `local Node ${process.version}`,
  started_at: null,
  finished_at: now,
  evidence_path: evidencePath,
  approver: passed ? 'automated' : null,
  notes
}));

const summary = {
  releaseId,
  generatedAt: now,
  scope: 'automated release IDs; manual IDs remain required by docs/lww-v3/qa-manifest.md',
  items,
  totals: {
    pass: items.filter((item) => item.status === 'pass').length,
    fail: items.filter((item) => item.status === 'fail').length
  },
  passed: items.every((item) => item.status === 'pass'),
  evidencePresent: {
    playwright: await exists(playwrightPath),
    lighthouse: await exists(lighthousePath),
    bundle: await exists(bundlePath),
    placeholders: await exists(placeholderPath)
  }
};

const outputDir = path.join(root, 'qa', releaseId);
await mkdir(outputDir, { recursive: true });
await writeFile(path.join(outputDir, 'release-summary.json'), JSON.stringify(summary, null, 2));
console.log(JSON.stringify(summary));
if (!summary.passed && process.env.REPORT_ONLY !== '1') process.exitCode = 1;
