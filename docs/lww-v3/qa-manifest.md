# Local Web Works — QA Release Manifest

Status: canonical test/evidence contract. Every mandatory ID must appear as `pass` in the machine-readable release summary.

Evidence root: `artifacts/qa/<release-id>/`
Release summary: `artifacts/qa/<release-id>/release-summary.json`

## Executable implementation

- `npm run qa:phase0` invokes `scripts/qa/run-phase0.mjs`, runs six commands sequentially and refreshes command logs under `artifacts/qa/local/`.
- `REPORT_ONLY=1 RELEASE_ID=<release-id> npm run qa:release-summary` invokes `scripts/qa/release-summary.mjs`, parses Playwright, Lighthouse, bundle and placeholder evidence, enumerates every automated ID below and fails closed for missing/unimplemented coverage.
- Phase 0 currently includes 36 passing Playwright checks across desktop, mobile, no-JS and reduced-motion, three unit tests, Astro check/build, built-output placeholder scanning and compressed transfer-budget analysis.
- Phase 0 is not a release pass. Dedicated package-link, keyboard, history/orientation, Save-Data, lifecycle, full axe color-contrast, visual, SEO, migration and truth-matrix checks remain red until implemented against the replacement.

## Automated IDs

| ID | Command/script | Required assertion | Evidence |
|---|---|---|---|
| BUILD-001 | `npm run check` | Astro/type checks pass | `build/check.txt` |
| BUILD-002 | `npm run build` | Production build exits 0 | `build/build.txt` |
| UNIT-001 | `npm test` | Pricing, message, metadata, capability and lifecycle unit tests pass | `tests/unit.xml` |
| E2E-001 | `npm run test:e2e` | Primary hero→proof→preview→pricing→contact journey passes | `playwright/` |
| E2E-002 | Playwright `package-links` | Every package/care link creates the correct prefilled WhatsApp/email destination | `playwright/package-links.json` |
| E2E-003 | Playwright `keyboard-nav` | Skip/nav/menu/anchors/CTA order and visible focus pass | `playwright/keyboard/` |
| E2E-004 | Playwright `history-resize` | Hash, back/forward, resize and orientation preserve valid state | `playwright/history-resize/` |
| FALLBACK-001 | Playwright JS-disabled project | Content, menu/legal/contact and pricing remain usable | `playwright/no-js/` |
| FALLBACK-002 | Playwright reduced-motion project | No scrub/morph/parallax; no 3D request | `playwright/reduced-motion/` |
| FALLBACK-003 | Save-Data/failed-enhancement test | Static fallback works and requests no renderer/GLB | `playwright/save-data/` |
| LIFE-001 | Lifecycle boundary instrumentation | Zero RAF/GPU frames after disposal; one instance after remount | `lifecycle/boundary.json` |
| A11Y-001 | axe on all public routes | No serious/critical violations | `axe/` |
| PERF-001 | `npm run benchmark:lighthouse` | V3 Lighthouse/budget thresholds pass | `../benchmarks/<release-id>/` |
| PERF-002 | `npm run benchmark:bundle` | Initial/deferred transfer budgets pass | `bundle/summary.json` |
| VIS-001 | Visual suite | Named viewports remain within committed diff tolerance | `visual/` |
| SEO-001 | SEO route test | Titles, descriptions, canonicals, schema, robots and sitemap match matrix | `seo/routes.json` |
| MIGRATE-001 | Redirect test | Every old URL has expected 200/301/410/404 result | `seo/migration.json` |
| LEGAL-001 | Placeholder scan | No bracketed required placeholder/draft warning appears in production | `legal/placeholders.txt` |
| TRUTH-001 | Content scan | No stale prices, unsupported badge, old timeline or unapproved proof claim | `truth/content.json` |

## Manual IDs

| ID | Environment/script | Expected result | Evidence/approver |
|---|---|---|---|
| AT-001 | NVDA + supported Windows Chrome/Firefox | Linear reading order explains complete process; all actions named/focused | recording + checklist + approver |
| AT-002 | VoiceOver + Safari | Same semantic/interaction result | recording + checklist + approver |
| AT-003 | TalkBack + Android Chrome | Same result; one-tap labels/actions | recording + checklist + approver |
| ZOOM-001 | 200% browser zoom | No clipped content; pinning falls back where needed | screenshots/checklist |
| ZOOM-002 | 400% text/reflow where applicable | Content reflows without two-dimensional scrolling except essential data tables | screenshots/checklist |
| COLOR-001 | Windows forced-colors | Content, focus and actions remain perceivable | screenshots/checklist |
| DEVICE-001 | Real iOS Safari | Toolbar/orientation/background return pass | video/checklist |
| DEVICE-002 | Registered low-end Android Chrome | Load, scroll, CTA and fallback pass | video/trace/checklist |
| HANDOFF-001 | Every desktop breakpoint | Before/during/after handoff has no flash, overlap, blank band or focus move | screenshot triptychs |
| CARE-LEGAL-001 | Human commercial review | Prices, limits, Terms, Privacy and proof manifest match V3 | signed checklist |
| CUTOVER-001 | Rollback rehearsal | Previous deployment restored within 10 minutes | timestamped runbook receipt |

## Required viewport set

320×568, 375×667, 390×844, 430×932, 768×1024, 1366×768, 1440×900 and 1920×1080.

## Pass/fail schema

Each release-summary item contains `id`, `status`, `command_or_script`, `environment`, `started_at`, `finished_at`, `evidence_path`, `approver` and optional `notes`. `status` is `pass` or `fail`; omitted/skipped mandatory IDs fail release.