import { createServer } from 'node:http';
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import lighthouse from 'lighthouse';
import { launch as launchChrome } from 'chrome-launcher';
import { chromium } from '@playwright/test';

let baseURL = process.env.BASE_URL ?? 'http://127.0.0.1';
const releaseId = process.env.RELEASE_ID ?? 'local';
const routes = (process.env.LIGHTHOUSE_ROUTES ?? '/,/pricing/,/contact/').split(',').map((route) => route.trim()).filter(Boolean);
const benchmarkRoot = path.resolve('artifacts/benchmarks', releaseId);
const outputDir = path.join(benchmarkRoot, 'lighthouse');
await mkdir(outputDir, { recursive: true });

const thresholds = { lcp: 2500, cls: 0.05, tbt: 200 };
const median = (values) => {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
};
const mime = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2'
};

let server;
if (!process.env.BASE_URL) {
  const dist = path.resolve('dist');
  server = createServer(async (request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url ?? '/', baseURL).pathname);
      const relative = pathname.endsWith('/') ? `${pathname}index.html` : pathname;
      let absolute = path.resolve(dist, `.${relative}`);
      if (!absolute.startsWith(dist)) throw new Error('invalid path');
      try {
        if ((await stat(absolute)).isDirectory()) absolute = path.join(absolute, 'index.html');
      } catch {
        if (!path.extname(absolute)) absolute = path.join(absolute, 'index.html');
      }
      const body = await readFile(absolute);
      response.writeHead(200, { 'content-type': mime[path.extname(absolute)] ?? 'application/octet-stream' });
      response.end(body);
    } catch {
      response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
      response.end('Not found');
    }
  });
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });
  const address = server.address();
  if (!address || typeof address === 'string') throw new Error('Unable to determine benchmark server address');
  baseURL = `http://127.0.0.1:${address.port}`;
}

const options = {
  logLevel: 'error',
  output: ['json', 'html'],
  onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  formFactor: 'mobile',
  screenEmulation: { mobile: true, width: 390, height: 844, deviceScaleFactor: 1, disabled: false },
  throttlingMethod: 'simulate',
  throttling: {
    rttMs: 150, throughputKbps: 1600, requestLatencyMs: 562.5,
    downloadThroughputKbps: 1474.6, uploadThroughputKbps: 675, cpuSlowdownMultiplier: 4
  }
};

const runs = [];
let chrome;
try {
  chrome = await launchChrome({
    chromePath: chromium.executablePath(),
    chromeFlags: ['--headless=new', '--no-first-run', '--disable-gpu']
  });
  for (const route of routes) {
    for (let run = 1; run <= 3; run += 1) {
      const result = await lighthouse(new URL(route, baseURL).href, { ...options, port: chrome.port });
      const lhr = result?.lhr;
      if (!lhr) throw new Error(`Lighthouse returned no LHR for ${route}`);
      const slug = route === '/' ? 'home' : route.replaceAll('/', '');
      const reports = Array.isArray(result.report) ? result.report : [result.report];
      await writeFile(path.join(outputDir, `${slug}-${run}.json`), reports[0] ?? JSON.stringify(lhr));
      if (reports[1]) await writeFile(path.join(outputDir, `${slug}-${run}.html`), reports[1]);
      runs.push({
        route,
        run,
        scores: Object.fromEntries(Object.entries(lhr.categories).map(([key, value]) => [key, value.score])),
        lcp: lhr.audits['largest-contentful-paint']?.numericValue ?? Number.POSITIVE_INFINITY,
        cls: lhr.audits['cumulative-layout-shift']?.numericValue ?? Number.POSITIVE_INFINITY,
        tbt: lhr.audits['total-blocking-time']?.numericValue ?? Number.POSITIVE_INFINITY
      });
    }
  }

  const routeResults = routes.map((route) => {
    const routeRuns = runs.filter((item) => item.route === route);
    const medians = {
      lcp: median(routeRuns.map((item) => item.lcp)),
      cls: median(routeRuns.map((item) => item.cls)),
      tbt: median(routeRuns.map((item) => item.tbt))
    };
    return {
      route,
      medians,
      passed: medians.lcp <= thresholds.lcp && medians.cls <= thresholds.cls && medians.tbt <= thresholds.tbt
    };
  });
  const summary = {
    releaseId,
    generatedAt: new Date().toISOString(),
    source: process.env.BASE_URL ? 'external-preview' : 'local-dist',
    routes,
    profile: options,
    versions: { node: process.version, lighthouse: runs.length ? '13.4.0' : null, browser: chromium.executablePath() },
    thresholds,
    routeResults,
    runs,
    passed: routeResults.every((item) => item.passed)
  };
  await writeFile(path.join(benchmarkRoot, 'summary.json'), JSON.stringify(summary, null, 2));
  console.log(JSON.stringify({ runs: runs.length, outputDir, passed: summary.passed, routeResults }));
  if (!summary.passed && process.env.REPORT_ONLY !== '1') process.exitCode = 1;
} finally {
  if (chrome) {
    try {
      chrome.kill();
    } catch (error) {
      if (error?.code !== 'EPERM') throw error;
      console.warn(`Chrome exited; Windows deferred temporary-profile cleanup: ${error.path ?? 'unknown path'}`);
    }
  }
  if (server) await new Promise((resolve) => server.close(resolve));
}
