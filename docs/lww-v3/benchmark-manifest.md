# Local Web Works — Benchmark Manifest

Status: versioned benchmark contract; runtime identity fields must be filled by the prototype operator and retained with evidence.

## Toolchain pinning

The implementation repository must commit exact versions in `package.json` and the lockfile for Astro, Playwright, Lighthouse/Lighthouse CI, axe integration, browser binaries and any trace-analysis utility. CI installs from the lockfile only.

Required commands:

- `npm run benchmark:lighthouse`
- `npm run benchmark:journey`
- `npm run benchmark:trace-summary`
- `npm run benchmark:bundle`

Required artefact root: `artifacts/benchmarks/<release-id>/`

Required machine-readable output: `artifacts/benchmarks/<release-id>/summary.json`

## Executable implementation

- Runner: `scripts/qa/run-lighthouse.mjs`
- Local built-site command: `RELEASE_ID=<release-id> npm run benchmark:lighthouse`
- External immutable-preview command: `BASE_URL=https://<deployment-url> RELEASE_ID=<release-id> LIGHTHOUSE_ROUTES=/,/pricing/,/terms/,/privacy/ npm run benchmark:lighthouse`
- Baseline/report-only command: `REPORT_ONLY=1 RELEASE_ID=local npm run benchmark:lighthouse`
- The runner binds an available local port, launches the pinned Playwright Chromium binary, retains JSON and HTML for three runs per route, calculates medians, writes `summary.json`, and exits non-zero when LCP/CLS/TBT thresholds fail.
- Phase 0 baseline routes are `/`, `/pricing/`, `/contact/` because the replacement legal routes do not exist yet. Release execution must explicitly pass the canonical route list above.
- Phase 0 result on 2026-07-12: homepage failed median LCP at approximately 6.155s; pricing and contact passed LCP/CLS/TBT. This is a measured old-site baseline, not a release pass.

## Simulated mobile Lighthouse profile

- Viewport: 390×844
- CPU slowdown multiplier: 4
- Download throughput: 1,600,000 bits/second
- Upload throughput: 750,000 bits/second
- Round-trip latency: 150ms
- Cache: cleared before every measured navigation
- Runs: three cold-cache runs per route; median determines pass/fail
- Routes: `/`, `/pricing`, `/terms`, `/privacy`
- Count fonts, CSS, analytics and initial images in page budgets

The committed Lighthouse config records the exact runner/browser versions and all flags. Raw HTML/JSON reports are retained.

## CSS/2.5D journey benchmark

Journey script:

1. Cold-load `/` at 1366×768.
2. Wait for fonts and stable layout.
3. Traverse arrival → proof → preview → editorial handoff.
4. Reverse to arrival.
5. Repeat ten measured journeys after one warm-up.
6. Cross the handoff boundary repeatedly and resize once.

Retain Chrome trace JSON and a summary containing frame count, long tasks, CLS, renderer instance count, active RAF count, listener/observer count and memory where available.

## WebGL reference device registration

WebGL cannot be approved until a real weak reference device record is complete:

- Device ID: `[REQUIRED]`
- Manufacturer/model: `[REQUIRED]`
- CPU: `[REQUIRED]`
- GPU and driver: Intel UHD 620 target or weaker/equivalent `[EXACT VALUE REQUIRED]`
- RAM: `[REQUIRED]`
- OS/build: `[REQUIRED]`
- Browser/version: `[REQUIRED]`
- Display/viewport: 1366×768 target `[ACTUAL REQUIRED]`
- Discrete GPU disabled/absent confirmation: `[REQUIRED]`

If Safari WebGL is targeted, register an integrated-graphics macOS/Safari device with the same fields.

## WebGL measurement

- Capability check completes before renderer import/assets.
- Cold-cache navigation.
- One warm-up plus ten complete measured forward/reverse journeys.
- Exact journey automation script committed.
- p95 frame time calculated by committed `benchmark:trace-summary` from retained raw traces.
- Required: p95 <20ms; no ordinary-scroll long task >100ms.
- Required: decoded texture/framebuffer estimate <64MB.
- Required: deferred renderer JavaScript ≤180KB gzip and transferred 3D assets ≤1.5MB.
- Required: zero frames/GPU work after handoff disposal; exactly one instance after reverse remount.
- Required: idle/hidden suspension and safe context-loss recovery.

Missing device fields, raw traces, commands, summary JSON or version pins fail WebGL approval and select CSS/2.5D-only production mode.