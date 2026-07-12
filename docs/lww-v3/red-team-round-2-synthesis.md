# Local Web Works V2 — Red-Team Round 2 Synthesis

Date: 2026-07-11

Inputs:
- Canonical V2 brief: `design-brief-v2-adversarial-revision.md`
- Durable ledger decisions
- Business-plan background
- Two independent read-only adversarial reviews: commercial/trust and implementation/UX

Verdicts:
- Commercial/trust reviewer: **REJECT**
- Implementation/UX reviewer: **REVISE**
- Consolidated verdict: **REVISE BEFORE PRODUCTION BUILD OR PUBLICATION**

A CSS/2.5D prototype may proceed only in an isolated preview branch/project, with no production cutover and no public commercial claims treated as final until the blockers below are resolved.

## Consensus blockers

1. **Legal contracting identity is unresolved.** `Local Web Works` is a public brand, but if it is not a registered legal entity with a UEN, proposals, invoices, Terms, Privacy and payment instructions need the actual legal contracting person. Do not collect payment until this is resolved.
2. **Terms and Privacy do not yet exist as approved, valid routes.** They must define payment, preview rights, revisions, ownership, cancellation, care, privacy responsibility, liability and precedence over marketing summaries.
3. **`Most selected` is unsupported social proof.** Replace it with a factual non-empirical label such as `Recommended` unless real paid-order evidence exists.
4. **The 3–4 day statement is too broad.** Restrict it to qualifying standard landing-page builds and define the clock: working days after scope, required content, access and deposit are complete. Custom sites, integrations and application work receive quoted timelines.
5. **Package boundaries are too loose.** The SGD 1,499 tier treats e-commerce, booking and CMS as comparable without limits. The `Web App from SGD 1,999` wording anchors potentially complex software too low. Define eligible feature limits and separate application discovery/quoting from standard website pricing.
6. **Care plans are priced before their service limits are complete.** Define a minor request, monthly allowances, business hours, response versus resolution targets, rollover, cancellation, hosting migration, backups, overages and excluded work before publication. SEO Care also needs a strict labour/task and reporting boundary.
7. **The free preview is underspecified.** Define eligibility, format, fidelity, turnaround, required inputs, number of directions/adjustments, watermarking/reuse rights, code/source exclusion and capacity/fit rejection rights.
8. **Payment, revision and ownership terms are incomplete.** Define one consolidated revision round, approver, deadlines, staging/acceptance milestone, dormant-project rules, deposit/refund/cancellation handling, final-payment deadline, deliverable ownership/licensing and portfolio rights.
9. **Production replacement lacks an isolation/cutover contract.** Use a protected redesign branch or separate repository/project, isolated Vercel preview, immutable release tag, rollback rehearsal, domain-alias cutover checklist and post-cutover smoke tests. Current production remains untouched until signed acceptance.
10. **The pricing customizer is premature.** Launch with static package/care comparisons and package-prefilled WhatsApp links unless a versioned option schema, valid combinations, URL state, no-JS fallback, message limits and exhaustive tests exist.

## High-priority UX and technical weaknesses

- Add an explicit hero category line such as `Website design and development for businesses`; the current hero is too ambiguous in a five-second test.
- Narrow the audience to enquiry-led/service businesses without requiring geographic wording; `any business` weakens relevance and package fit.
- Define the exact cinematic-to-editorial handoff: DOM ownership, sticky teardown, stacking, background, focus and anchor behavior.
- Gate the pinned process by usable width, height, zoom, input and motion capability; use the stacked fallback for short/zoomed/dynamic-chrome viewports.
- Keep one canonical ordered process list in semantic DOM. Visual state changes stay decorative and must not duplicate/hide core copy or use noisy live announcements.
- Ensure mobile navigation works without JavaScript, preferably with native disclosure semantics or always-available essential links.
- Define a finite CSS/2.5D state model, maximum layers and canonical content source. Kill it if it requires duplicate semantic content or per-breakpoint manual positioning.
- Make WebGL budgets reproducible with named low-end reference hardware, cold-cache procedure, dependency accounting and pre-download capability gating.
- Add an old-to-new URL inventory, 301/410 decisions, canonical/metadata/schema matrix, sitemap/robots checks, Search Console and post-cutover crawl.
- Add privacy-compatible analytics for CTA, portfolio, pricing and customizer events without transmitting entered business details.
- Turn the QA checklist into executable Playwright, axe, Lighthouse CI, bundle, no-JS, reduced-motion, keyboard and retained manual screen-reader evidence.
- Reduce/group the 19-question FAQ by Preview, Build, Payment/ownership, Care and Integrations, exposing the highest-risk answers first.

## Proof and trust corrections

- Eraspace and Sarathy need exact attribution: Local Web Works role, work performed, scope, date and whether each was client, collaborative or internal work.
- Historical note: round 2 reviewed the then-current seven-day Eraspace wording. Lucas later corrected the supported claim to a ten-day redesign sprint; V3 and the durable ledger now use ten days. Sarathy was corrected from `final product` to `MVP`.
- Maintain permission artefacts and crop-level provenance, including third-party content review.
- Address the brand/domain mismatch wherever `contact@sitesbuilder.store` appears, e.g. `Local Web Works via sitesbuilder.store`, and keep sender name, WhatsApp, invoices and legal pages consistent.

## Recommended sequence

1. Resolve legal seller identity and draft Terms/Privacy.
2. Remove unsupported `Most selected`; tighten hero and timeline language.
3. Bound build packages, care plans, preview, payment, revisions and ownership.
4. Simplify `/pricing` launch to static comparisons and prefilled enquiries.
5. Define isolated prototype/deployment and migration gates.
6. Build the semantic/CSS prototype and test the pinned handoff on real devices and assistive technology.
7. Decide whether WebGL survives the measured prototype gate.
8. Only then approve production cutover.