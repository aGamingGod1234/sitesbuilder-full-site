# Local Web Works Website Plan V3

Date: 2026-07-11
Status: revised after red-team round 2; ready for final adversarial review after the explicit launch blockers are filled

## 1. Purpose and source precedence

Build the main Local Web Works business website as a truthful, high-quality sales document for enquiry-led businesses. It must explain the service, show attributable proof, define the free preview, present bounded pricing, answer commercial questions and create a direct WhatsApp or email enquiry.

The complete site must remain understandable and usable without animation, JavaScript, WebGL, hover, a large screen or fine pointer.

Source precedence:

1. Explicit decisions made by Lucas after 2026-07-11.
2. This V3 plan.
3. `red-team-round-2-synthesis.md` as the remediation rationale.
4. V2 and earlier collaborative briefs as historical design references only.
5. The old business plan and existing production only where they do not conflict with V3.

## 2. Non-negotiable truth and launch gates

- Public brand: `Local Web Works`.
- `sitesbuilder.store` is the current web and email domain, not a second public brand.
- Display email as `Local Web Works — contact@sitesbuilder.store`; sender name, WhatsApp profile, proposals and invoices must use the same identity.
- Launch is English-only. Do not recreate Chinese pages or expose a language switch. Existing indexed legacy URLs still require explicit 301 or 410 decisions.
- No invented clients, metrics, testimonials, package popularity, conversion results or case-study claims.
- Replace the unsupported `Most selected` badge with `Recommended`.
- Do not collect payment or publish final Terms/Privacy until the contracting identity is complete.
- Legal contracting identity: `Lucas Toh trading as Local Web Works`. No UEN is currently registered and no business/correspondence address has yet been supplied. The address remains a launch/payment-document blocker.
- Terms route: `/terms`. Privacy route: `/privacy`. Neither may be a placeholder at launch.
- Current production remains untouched until an isolated preview passes acceptance and a rollback has been rehearsed.

## 3. Audience and positioning

Primary audience:

> Enquiry-led businesses whose customers need to understand the offer, proof, pricing or expectations before making contact.

This remains geographically open but is more specific than `any business`. It fits service businesses, owner-led businesses, professional services, hospitality, retail and similar businesses where a clear customer path matters.

Category line:

> Website design and development for enquiry-led businesses.

Positioning:

- Local Web Works operates as a freelance contract website business that builds, upgrades and optionally maintains websites for businesses and clients.
- Lead with quality and clarity.
- Speed supports the offer but is not the primary quality claim.
- No public AI positioning.
- WhatsApp is primary; email is secondary; no contact form.

## 4. Visual and interaction concept

### Bounded proof workshop

The dark charcoal/gunmetal workshop exists only across three early enhanced states:

1. Arrival canvas.
2. Eraspace and Sarathy proof arrangement.
3. Free-preview process resolving into a finished responsive website.

After state 3, the sticky container ends, its decorative canvas is removed from the stacking context, and a normal editorial document begins. Pricing, FAQ, trust, legal summaries and contact are not cinematic scenes.

Visual system:

- Deep charcoal/gunmetal outer field.
- Warm off-white typography and paper-like comparison surfaces.
- Restrained muted copper for active state, boundaries, rules and CTAs.
- Mostly fixed camera; no constant orbiting, particles, machinery, fake code or countdowns.
- Strong architectural sans-serif headlines with concise human supporting copy.
- Preserve the current Local Web Works logo.

### Exact cinematic-to-editorial handoff

- Handoff occurs immediately after the Preview → Approve → Finish section.
- The sticky wrapper has an explicit end marker and cannot overlap the next section.
- Editorial root owns its own opaque background and stacking context.
- Decorative layers are set to `pointer-events:none` and `aria-hidden:true`.
- Scroll never moves keyboard focus.
- Anchor targets are semantic headings with `scroll-margin-top` matching the fixed navigation.
- The enhancement uses one idempotent lifecycle: `mount → suspend → dispose → remount`.
- `suspend` cancels animation frames and pauses observers while preserving only the minimum state required for reversible scrolling.
- `dispose` cancels RAF callbacks; disconnects observers; removes listeners; disposes geometries, materials, textures and render targets; releases the WebGL context where supported; and clears instance references.
- Reverse entry may remount exactly one clean instance from canonical state. Repeated boundary crossings cannot create duplicate renderers, listeners or observers.
- After handoff, no workshop renderer, fixed canvas, transform or ambient loop remains active. A boundary instrumentation test must record zero renderer frames/GPU work after disposal and exactly one active instance after reverse remount.
- Required visual captures: one viewport before the boundary, at the boundary, and one viewport after it at every desktop breakpoint.
- Kill the animated handoff if it creates a blank sticky band, flash, overlap, focus change, anchor error or persistent background work.

## 5. Information architecture

Homepage:

1. Hero and explicit service category.
2. Two attributable finished projects.
3. Compact customer-clarity bridge.
4. Preview → Approve → Finish process.
5. Finished customer outcome.
6. Three build-price cards.
7. Grouped FAQ/trust summary.
8. Final WhatsApp/email CTA and footer.

Additional routes:

- `/pricing`: static detailed package and care comparison with package-prefilled WhatsApp/email actions.
- `/terms`: approved commercial terms.
- `/privacy`: approved privacy policy.
- Individual case studies only after enough factual material exists.

There is no pricing calculator or combinatorial customizer at launch. `Customise your plan` opens a prefilled enquiry; it does not calculate, quote, check out or collect payment.

## 6. Hero

Eyebrow:

> Website design and development for enquiry-led businesses

Headline:

> See your business at its best.

Support:

> See a non-production preview of your first two landing-page sections before deciding whether to continue. No payment is required before preview approval.

Timing note:

> Most qualifying Essential and Enhanced builds are ready for staging in 3–4 working days after scope, required content, account access and the first payment are complete. Custom websites and integrations receive a quoted timeline.

Primary CTA:

> Get my free preview

Secondary text links:

- View real work
- Email Local Web Works

The headline, category, preview boundary, CTA and contact availability load immediately. No intro, loader or animation blocks them. A five-second test must produce at least 80% correct identification that Local Web Works designs and develops websites.

## 7. Portfolio proof

Heading:

> Real work, clearly shown.

Use exactly two project groups with one primary and one attached detail crop each. Labels, project type, attribution and live link are visible without hover.

### Eraspace

Relationship label:

> Internal demonstration project

Public description:

> A crafted consumer-electronics commerce demo exploring how a dense product catalogue can be shaped into a clearer, more deliberate storefront experience. Local Web Works established the visual direction, organised the page and product-discovery flow, wrote and refined the interface copy, and designed and developed the finished experience through a ten-day redesign sprint.

Factual scope:

- Internal Local Web Works demonstration project, not a paid client engagement.
- Local Web Works scope: design, development and copy.
- Completed through a ten-day redesign sprint.
- Permission to publish screenshots and claim the work is confirmed.
- Do not imply measured sales, conversion, speed, usability or client outcomes.

### Sarathy

Relationship label:

> Paid client project

Public description:

> A focused student-finance product experience taken from an early concept to a working MVP in four days. Local Web Works shaped the visual direction, structured the product story and customer journey, wrote and refined the interface copy, and designed and developed the landing experience into a coherent first release.

Factual scope:

- Paid client project.
- Local Web Works scope: design, development and copy.
- Taken from concept to MVP in four days.
- Client permission to publish screenshots and claim the work is confirmed.
- Do not imply financial outcomes, customer adoption, conversion performance or work beyond the confirmed MVP scope.

Truth and asset rules:

- Time claims describe these specific project scopes, not a guarantee for every build.
- Do not imply Local Web Works created work outside the confirmed attribution.
- Store dated local AVIF/WebP captures; no live iframes or remote textures.
- Complete `proof-manifest.md` before any public preview/cutover. Every crop records source URL, project completion evidence or an explicit decision not to show a calendar date, capture date, viewport, crop, project, alt text, compression, rights holder, permission artefact ID/path, allowed channels, third-party-content review and revocation contact.
- Remove popup, counter, loading, debug, clipped or overlapping-text states.
- Kill any crop without traceable permission or with unapproved customer/personal/third-party content.

Desktop uses the selected grouped asymmetric composition. Mobile presents one complete named project at a time without overlap.

## 8. Compact customer-clarity bridge

Heading:

> Customers should not have to dig for the basics.

Copy:

> A clear business website answers the questions people ask before they contact you: what you offer, what it costs, why they should trust you and what to do next.

Stable labels: Services · Pricing · Proof · FAQs · Contact

Desktop allocation is approximately 60–75vh; mobile uses natural content height. This does not become a fourth cinematic state.

## 9. Free preview contract

Heading:

> See the direction first. Continue only if it feels right.

The free preview is:

- One non-production visual direction for the first two landing-page sections: the hero and one following section.
- Delivered as watermarked desktop and mobile stills or a controlled non-production preview.
- Based on one business, one primary offer and materials the requester is authorised to provide.
- Usually prepared within 2–3 working days after Local Web Works confirms fit, capacity and receipt of the required inputs; the actual date is confirmed in writing.
- Inclusive of one consolidated adjustment request to the preview direction.
- Subject to fit, capacity, lawful-content and sufficient-input checks; Local Web Works may decline or defer a request before work begins.

Required inputs:

- Business name and current link.
- Main offer and preferred customer action.
- Logo/brand assets where available.
- Existing copy, product/service information and approved images.
- Confirmation that supplied material may be used for the preview.

The free preview is not:

- A completed website.
- Production-ready code or reusable implementation.
- Source files, editable design files or final assets.
- Full copywriting, unlimited concepts or unlimited revisions.
- A transfer of ownership or permission to launch/reuse the direction before a paid agreement.

No payment is due before preview approval. Preview details and supplied material are handled under the Privacy Policy. The Terms define permitted use and deletion/retention.

## 10. Preview → Approve → Finish interaction

Canonical content is one normal ordered list in semantic DOM. It is never duplicated, hidden from assistive technology or announced through `aria-live` during scrolling. Decorative visual state is supplementary.

1. **Preview:** inspect the first two-section direction and submit one consolidated adjustment if needed.
2. **Approve:** confirm scope, content, access, package, timeline, third-party costs and the 50% project-start payment.
3. **Finish:** qualifying Essential and Enhanced builds are usually presented at staging in 3–4 working days after all start conditions are complete; Custom Website and integration timelines are quoted.

Desktop enhancement:

- Restrained pinned sequence over approximately 160–200vh.
- One persistent decorative canvas; state changes only at boundaries.
- No wheel interception or snapping.

Pinning eligibility requires all of:

- `min-width: 1024px`
- `min-height: 720px`
- fine pointer and hover capability
- no reduced-motion preference
- no Save-Data preference
- a measured usable block size after fixed-header and safe-area deductions in which every canonical step fits at the active text scale

Re-evaluate eligibility after `document.fonts.ready`, through `ResizeObserver`, and on visual/layout viewport, orientation and content-size changes. Switch immediately to stacked mode if any step overflows or available block size becomes insufficient.

Use stacked editorial steps when any condition fails, including short laptop viewports, browser zoom that reduces usable CSS dimensions, dynamic mobile chrome, touch-first devices, no-JS and low-capability sessions. Kill pinning if any content or CTA requires completing animation to become available.

## 11. Build packages

Homepage shows exactly three clean cards. The middle card uses the factual label `Recommended`, not `Most selected`.

### Essential Landing Page — SGD 999

- One responsive landing page.
- Up to six agreed content sections.
- One primary offer and contact path.
- Client-supplied content with light structural editing.
- Basic title, description, social image, indexability and on-page semantic setup.
- Two revision rounds.
- No custom backend, account system, booking engine, catalogue or CMS.

### Enhanced Business Site — SGD 1,499 — Recommended

- One responsive landing-page-led business site, up to eight agreed content sections.
- Essential's listed responsive-page, content, contact and basic on-page setup deliverables, plus exactly one bounded capability:
  - **Booking:** embed/configure one existing supported booking provider; no custom scheduling logic or data migration.
  - **Small commerce:** up to ten supplied products using one supported hosted catalogue/payment service; no custom checkout, inventory migration, tax, shipping or fulfilment logic.
  - **CMS:** one content collection, one editor role and up to twenty supplied initial entries; no bulk migration or custom workflow.
- Three revision rounds.
- Provider subscriptions, transaction fees and paid tools are separate.
- Anything outside the selected allowance moves to a written custom quote.

### Custom Website — From SGD 1,999

- Custom marketing/information website for an agreed multi-page scope, normally up to five core pages at the starting range.
- Four revision rounds for the agreed scope.
- Exact price and timeline follow discovery, content and integration review.
- Extra pages, heavy copywriting, migration, multilingual content and advanced integrations are quoted separately.

### Web applications

Web applications are not included in the SGD 1,999 website floor. Authentication, databases, dashboards, roles/permissions, payments, custom business logic, APIs and application maintenance require paid or explicitly agreed discovery followed by a custom proposal. No public application price is promised before discovery.

## 12. Payment, revisions and ownership

Standard website payment:

- 0% before preview approval.
- 50% after preview approval, written scope, required content/access and commercial terms are confirmed.
- The first payment reserves production capacity and becomes non-refundable once production work starts, except where applicable law or the signed terms require otherwise.
- 50% is due within seven calendar days after written staging acceptance, or after included revision rounds are complete **and the deliverable materially matches the written scope**. It remains due before public launch, repository/file handoff or account transfer.
- If the customer disputes material scope conformity in good faith, they must identify the specific written-scope mismatch within five business days. Local Web Works receives one reasonable cure opportunity and replies with the correction or a written scope explanation before treating the disputed amount as due.
- Cancellation after production begins is billed for completed work and committed third-party costs, less amounts already paid.

One build revision round means one consolidated feedback submission from the named authorised approver against the agreed scope. It does not include a new concept, new page, new section, new integration, change of strategy or fragmented feedback from multiple stakeholders. Extra work is quoted and approved before it begins.

Client feedback is due within five business days of each review request. After ten business days without the required feedback or material, the project pauses and the schedule is rebooked subject to availability. After thirty calendar days without response, the project becomes dormant; completed work and committed costs may be invoiced under the Terms. Dormancy is not automatic acceptance.

After full payment, the customer receives ownership of the bespoke final website code, customer-supplied content and bespoke deliverables expressly listed in the proposal. Unless expressly included, ownership does not transfer for:

- Third-party software, fonts, stock assets, plugins, APIs or services, which remain under their licences.
- Local Web Works reusable components, internal tooling, templates, know-how and pre-existing materials. For retained material embedded in the delivered site, the customer receives a perpetual, worldwide, royalty-free, non-exclusive licence to use, host, reproduce, modify and maintain that material as part of the delivered site, to appoint successor providers to do so, and to transfer that licence with the site or business. Standalone reuse outside the delivered site is not included unless stated.
- Editable design/source working files not listed as deliverables.
- Secrets or credentials belonging to Local Web Works or another customer.

The final proposal must list repository transfer, domain/account ownership, design files, content, licences and any retained reusable materials. Local Web Works asks for written permission before using a finished customer project publicly.

## 13. No-care handoff and post-launch warranty

Without monthly care:

- The customer receives the agreed production handoff after full payment.
- Domain and customer-owned service accounts remain in the customer's name.
- Hosting is transferred to or funded by the customer; Local Web Works hosting/support ends at the agreed handoff date.
- A fourteen-calendar-day defect warranty covers reproducible faults where delivered functionality does not match the written scope. It excludes new requests, customer/third-party changes, content edits and external-service failures.
- Ongoing hosting, monitoring, backups, security updates, analytics reporting, edits and recovery are the customer's responsibility unless separately purchased.
- Later assistance is subject to availability and a new quote.

## 14. Monthly care plans

Business hours: Monday–Friday, 09:00–18:00 Singapore time, excluding Singapore public holidays. Response targets are acknowledgement/triage targets, not guaranteed resolution times. Resolution estimates follow investigation.

A `minor change request` is one consolidated request affecting existing content, images, links, metadata or styling within the existing approved layout and requiring no more than approximately thirty minutes of implementation. It excludes new pages, sections, layouts, features, integrations, migrations, copywriting campaigns and redesigns.

### Essential Care — SGD 49/month

- Managed hosting for the delivered Astro/static or agreed serverless site on the supported production stack, subject to ordinary fair-use traffic and provider limits stated in the proposal. Databases, file storage, email, paid APIs, commerce/booking providers and unusual bandwidth/compute are separate unless listed.
- One minor change request per month.
- First response within three business days.
- Pre-change deployment snapshot and rollback availability while the plan remains active. These snapshots protect deployments; they are not continuous customer-data backups.

### Full Care — SGD 99/month

- Essential Care's listed hosting and deployment protections.
- Two minor change requests per month.
- First response within two business days.
- Existing-site technical support for the delivered stack.
- Routine maintenance is limited to supported package/deployment updates that do not require a redesign, migration, new paid service or material architecture change; larger remediation is quoted.

### SEO Care — SGD 149/month

- Managed supported-stack hosting, deployment protections, existing-site technical support and bounded routine maintenance as listed in Full Care.
- Up to four minor change requests per month.
- First response within one business day.
- Monthly report covering agreed analytics, Search Console visibility, indexation and material technical findings.
- Automated monitoring plus bounded technical/on-page improvements within the monthly allowance.
- No ranking, traffic, lead or revenue guarantee; strategy, backlink campaigns, new content production and major technical remediation are separately quoted.

### Complete Care — SGD 199/month

- Managed supported-stack hosting, deployment protections, existing-site technical support, bounded routine maintenance, monthly SEO/analytics reporting, monitoring and bounded technical/on-page improvements.
- Up to six minor change requests per month.
- Same-business-day acknowledgement for requests received before 14:00 on a business day; otherwise next-business-day acknowledgement.
- Highest queue priority within business hours.
- One quarterly thirty-minute website/SEO review call.
- No unlimited work or emergency 24/7 SLA.

Care terms:

- Unused requests do not roll over.
- Overage or out-of-scope work is quoted and approved first.
- Plans are month-to-month and may be cancelled before the next renewal.
- No refund is due for a current period after work, hosting or reserved capacity has begun, except where law requires otherwise.
- Service continues through the paid period. If all outstanding invoices are paid, the agreed export/handoff is made available before managed hosting ends. Local Web Works targets delivery within seven business days of a valid cancellation request and maintains a reasonable migration overlap through the paid period.
- Local Web Works-managed hosting ends at the close of the paid period unless migration overlap is separately agreed. Hosting will not be intentionally terminated before the promised paid-through date or before an already-due export is made available.
- Deployment history and customer content are retained for thirty days after service ends, then may be deleted, subject to legal/accounting retention and the Privacy Policy.
- Domain, customer-owned accounts and customer data remain the customer's property.
- Paid providers, domains, email, transaction fees, APIs and third-party tools are separate unless explicitly listed.

## 15. Pricing presentation

Homepage:

- Three website cards only.
- Readable note immediately below: 50/50 payment, ownership after final payment, included revision rounds, extra-work approval and separate third-party costs.
- `Compare plans` links to `/pricing`.
- Each card has a package-prefilled WhatsApp link.

`/pricing` launch version:

- Static, crawlable comparison table for three website packages and four care plans.
- Two or three factual example combinations, labelled examples rather than discounts or calculated quotes.
- Package-prefilled WhatsApp/email actions.
- `Customise your plan` produces only a short prefilled enquiry selection; no live total, checkout, payment, account, URL state or combinatorial app at launch.
- Every `from` amount and excluded cost remains visible near the relevant action.

## 16. FAQ information architecture

Use normal document flow and group visible, crawlable answers under five headings. Native `<details>` is allowed only when headings and answers remain accessible without custom JavaScript; the highest-risk answers start open.

### Preview

1. Is the preview really free?
2. What exactly is included and excluded?
3. Who is eligible and when will it arrive?

### Build and timing

4. What must be ready before the 3–4 working-day clock starts?
5. What counts as a revision?
6. What happens if content or feedback is late?

### Payment and ownership

7. How does the 50/50 payment schedule work?
8. What ownership and files transfer after final payment?
9. Which third-party costs remain separate?

### Care

10. What counts as a monthly minor request?
11. What happens without care or after cancellation?
12. Are requests, hosting or support unlimited?

### Integrations and custom work

13. What is included in the Enhanced capability?
14. When is a custom quote or application discovery required?

Terms govern where a short marketing answer conflicts with the signed proposal or legal terms.

## 17. Contact and identity

Final CTA:

> Let us show you what your business could look like.

> Send your business link and a little about what you offer. We will confirm fit, required inputs and the expected date for your free preview.

WhatsApp: `+65 9161 6337`

Prepared message:

> Hi Local Web Works, I’d like to request a free website preview.
>
> Business name:
> Current website or social link:
> What the business offers:
> What I’d like improved:
> Preferred package, if known:
>
> Thank you.

Encoded URL:

`https://wa.me/6591616337?text=Hi%20Local%20Web%20Works%2C%20I%E2%80%99d%20like%20to%20request%20a%20free%20website%20preview.%0A%0ABusiness%20name%3A%0ACurrent%20website%20or%20social%20link%3A%0AWhat%20the%20business%20offers%3A%0AWhat%20I%E2%80%99d%20like%20improved%3A%0APreferred%20package%2C%20if%20known%3A%0A%0AThank%20you.`

Email display: `Local Web Works — contact@sitesbuilder.store`

Identity note near email or footer:

> sitesbuilder.store is the current web and email domain used by Local Web Works.

Footer requires legal contracting identity, WhatsApp, email, Terms, Privacy, work links and the no-payment-before-preview-approval statement.

## 18. Semantic and CSS/2.5D architecture

- Astro semantic HTML is the source of truth.
- One canonical content data source feeds static, CSS/2.5D, posters and optional WebGL derivatives.
- Maximum six decorative layers in any enhanced state.
- Finite state model: `arrival`, `proof`, `preview`; process substate is derived from the canonical ordered list.
- CSS variables/data attributes control state; no duplicate semantic copy and no breakpoint-specific copy forks.
- Kill CSS/2.5D if it requires per-breakpoint manual coordinates for every object, duplicate interactive elements or a separately maintained representation.
- IntersectionObserver may select visual state but never controls content availability.
- No global smooth-scroll library.
- No text or links baked into images/textures.
- Mobile navigation uses native `<details>` or renders essential links outside the collapsed control. If enhanced, support Escape, focus return, `aria-expanded`, outside click and background inertness.

## 19. Optional WebGL gate

WebGL is not the baseline and must not be requested on mobile, reduced motion, Save-Data or failed capability checks.

Reference weak desktop class: Windows laptop with Intel UHD 620 integrated graphics, 1366×768 and no discrete GPU. WebGL cannot be approved until one real reference device is registered with exact device/CPU/GPU/driver/RAM/OS/browser versions. Also register one integrated-graphics macOS Safari device if WebGL targets Safari.

`benchmark-manifest.md` is mandatory. It pins CI/tool/browser versions and records the exact throttling values, cache reset, journey script, p95 extraction command, artifact directory, raw traces and summary JSON.

Measurement contract:

- Cold-cache navigation.
- Full deferred renderer dependency and asset accounting.
- Capability check before dynamic import or renderer asset request.
- Chrome Performance trace for ten complete forward/reverse journeys after one warm-up.
- p95 frame time below 20ms; no long task above 100ms during ordinary scroll.
- Decoded texture/framebuffer estimate below 64MB.
- Deferred WebGL JS at or below 180KB gzip and transferred 3D assets at or below 1.5MB.
- Stop rendering while idle/hidden and recover safely from context loss.

Kill WebGL if it fails on the weakest named desktop, duplicates content/state maintenance, harms readability, exceeds budgets or creates a worse transition than CSS/2.5D.

## 20. Reproducible performance gates

Run at least three cold-cache Lighthouse CI runs on the preview URL using the same configuration; use the median and retain reports.

Simulated mobile profile:

- 4× CPU slowdown.
- Approximately 1.6Mbps down / 750Kbps up / 150ms RTT.
- 390×844 viewport.

Required:

- LCP ≤2.5s; target ≤2.0s.
- INP ≤200ms in field/real-device evidence where available.
- CLS ≤0.05.
- Lab TBT ≤200ms.
- Initial mobile transfer including poster ≤500KB compressed.
- Initial desktop transfer before enhancement ≤700KB compressed.
- Poster per state target ≤200KB.
- Texture default maximum 2048px and renderer DPR cap approximately 1.5.
- Zero 3D payload for mobile/reduced-motion/Save-Data/no-JS fallbacks.

Analytics, fonts, CSS and initial images count toward budgets. Any enhancement regression fails the gate.

## 21. Accessibility contract

- Target WCAG 2.2 AA.
- Complete content and contact actions work without JavaScript.
- Canvas/decorative layers are aria-hidden and non-interactive.
- One canonical ordered process list remains in the accessibility tree.
- No scroll-triggered `aria-live` announcements.
- Keyboard order matches visual reading order; every action has visible focus.
- Touch targets are at least 44×44 CSS pixels.
- Test at 200% browser zoom, 400% text enlargement/reflow where applicable and Windows forced-colors.
- Manual scripts: NVDA + Chrome/Firefox, VoiceOver + Safari and TalkBack + Chrome.
- Kill any state-dependent disclosure that prevents a linear screen-reader user from understanding the full process.

## 22. SEO, migration and structured data

Before implementation, inventory every existing public/indexed URL from the live site, repository, sitemap and Search Console where accessible.

Create an old-to-new map:

- Relevant equivalent → 301.
- Intentionally removed with no replacement → 410 where supported, otherwise a truthful 404.
- Do not redirect every removed URL to the homepage.
- Chinese content is not recreated, linked or included in hreflang/sitemap.

Create a metadata matrix for `/`, `/pricing`, `/terms`, `/privacy` and any retained work route:

- Unique title and description.
- Self-referencing canonical.
- Open Graph/Twitter image and text.
- Index/noindex decision.
- Schema type and legal seller identity.

Remove all stale prices from UI, JSON-LD, metadata, message templates and hidden content. Validate sitemap, robots, canonical, redirects, 404/410, structured data and social previews before cutover. Submit/inspect the production sitemap and run a post-cutover crawl.

## 23. Privacy-compatible analytics

Define only non-sensitive events:

- `hero_preview_click`
- `portfolio_link_click` with project identifier
- `pricing_view`
- `package_enquiry_click` with package identifier
- `care_enquiry_click` with care identifier
- `email_click`
- `fallback_mode` as coarse static/reduced/enhanced mode
- Web Vitals

Never send business names, entered message text, URLs supplied by a prospect, phone numbers or email content to analytics. Analytics is disabled at launch unless a provider, cookie/storage behavior, processors/transfers, lawful or consent basis, retention and opt-out are recorded in Privacy and pass the release gate. Do not claim the cinematic treatment improves conversion without measured evidence.

## 24. Isolated deployment and rollback

- Use repository `aGamingGod1234/sitesbuilder-full-site`, protected production branch `main`, and protected redesign branch `redesign/v3` unless repository audit shows a different canonical production branch.
- Create a separate Vercel preview project named `sitesbuilder-v3-preview`; it receives no production domain alias and no production secrets unless strictly required and separately approved.
- The existing production Vercel project remains the cutover target only after acceptance. Protect the production-connected branch from direct pushes and automatic redesign cutover.
- Follow `deployment-cutover-runbook.md`, recording operator, exact commands, current production deploy ID, verification URLs, rollback triggers and a maximum ten-minute restoration target.
- Keep current production deploy ID, release metadata and domain configuration recorded.
- Before cutover: clean build, full test evidence, legal/content approval, immutable release tag, backup/export, rollback rehearsal and signed acceptance.
- Cutover is a domain-alias switch or controlled production promotion, not an unreviewed push.
- Immediately after cutover: homepage/pricing/legal smoke tests, CTA checks, redirects, sitemap, structured data, analytics, console/network and Web Vitals check.
- If critical failure occurs, restore the prior deployment/domain alias and record the failure before another attempt.

## 25. Executable release gates

Automated:

- Astro check and production build.
- Unit tests for pricing data, message generation, route metadata and capability decisions.
- Playwright: primary journey, package-prefilled WhatsApp links, keyboard navigation, anchors/back-forward, resize, orientation, no-JS, reduced-motion, Save-Data simulation, failed enhancement asset and production-route smoke tests.
- axe: no serious or critical violations.
- Lighthouse CI and bundle-size gates.
- Visual regression at 320×568, 375×667, 390×844, 430×932, 768×1024, 1366×768, 1440×900 and 1920×1080 with defined tolerances.

Manual retained evidence:

- Real iOS Safari and low-end Android Chrome.
- NVDA, VoiceOver and TalkBack scripts.
- 200% zoom, enlarged text and forced-colors.
- Dynamic browser toolbar, background-tab return, low power, slow/failed network, reverse scroll and WebGL context loss where applicable.
- Before/during/after cinematic handoff captures.

`qa-manifest.md` maps every automated/manual gate to a stable test ID, command or numbered script, environment, expected assertion, evidence path and approver. A machine-readable release summary must contain every mandatory ID with `pass`; missing IDs fail release.

Release fails if any mandatory scenario is unexecuted, any required legal/content placeholder remains, any old price survives, current production was overwritten early, or a fallback downloads 3D resources.

## 26. Prototype sequence

1. Fill the legal seller and portfolio-attribution blockers enough to prevent false public content.
2. Create isolated preview branch/project and rollback record.
3. Build semantic hero, two-project proof, process, CTA and all static/no-JS/reduced-motion states.
4. Build finite CSS/2.5D three-state enhancement.
5. Review five-second comprehension, handoff, mobile, zoom, assistive technology and reproducible performance.
6. Revise or kill pinning/2.5D if gates fail.
7. Decide whether a WebGL spike is justified.
8. Complete pricing, grouped FAQ, Terms, Privacy, metadata and migration work.
9. Run full release gates and final adversarial approval.
10. Cut over only after approval and rollback rehearsal.

## 27. Explicit blockers still requiring Lucas

1. Business/correspondence address for Lucas Toh trading as Local Web Works. No UEN currently exists; do not imply registration.
2. Completion month/year for Eraspace and Sarathy if dates will be shown publicly or stored in the proof manifest.
3. Review/approval of the Terms and Privacy drafts before publication.
4. WebGL decision only after the measured CSS/2.5D prototype review. Before cutover, record exactly one production mode: `CSS/2.5D only` or `WebGL approved with retained passing evidence`; missing/failed evidence automatically selects CSS/2.5D only.