# SitesBuilder Immersive Hero PRD

**Project:** SitesBuilder by Local Web Works — immersive homepage hero  
**Document type:** Product Requirements Document  
**Date:** 2026-07-04  
**Owner:** Local Web Works / SitesBuilder  
**Status:** Ready for implementation planning

---

## 1. Objective

Create a premium, minimal, interactive hero section for `sitesbuilder.store` that communicates the free-preview-first offer without using a standard SaaS landing-page layout.

The hero should feel like a high-end interactive web experience: sparse, cinematic, scroll-responsive, and product-specific. It should use proof tiles as the core lower-stage metaphor, showing that SitesBuilder creates real, usable website previews before the client commits.

---

## 2. Core correction from design review

The previous direction drifted into a typical SaaS split layout: left text, right browser cards/dashboard. That is rejected.

The approved direction is closer to the PeachWeb pattern:

- minimal floating navigation;
- oversized top-left headline;
- small CTA pair;
- strong negative space;
- a huge lower interactive/cinematic viewport beginning in the lower half;
- the viewport extends below the fold, making scroll feel like entering the experience;
- proof tiles provide meaning inside the viewport.

This should be inspired by PeachWeb’s structure and restraint, not copied. Do not copy PeachWeb’s fish, brand, palette, logo, objects, copy, timing, or assets.

---

## 3. Audience

Primary audience: local businesses, with Singapore as the starting market.

Typical visitor goals:

- understand what SitesBuilder sells;
- see that they can preview the first two landing-page sections before buying;
- trust that Local Web Works can produce high-quality real websites;
- view proof/examples;
- start a WhatsApp/email preview request.

---

## 4. Positioning and offer

### Product identity

- Product-facing name: `SitesBuilder`
- Company line: `by Local Web Works`
- Primary CTA: `Get my free preview`
- Secondary CTA: `View examples`

### Offer promise

SitesBuilder drafts the first two landing-page sections before the client commits. The free preview is not a full free website; it is a high-quality first-direction proof.

### Pricing anchors to preserve elsewhere on the site

- Starter Website: from `S$999`
- Business Website: from `S$1,499`
- Custom Build: `S$1,999+`

Do not overload the hero with pricing. The hero should stay minimal and point to the preview action.

---

## 5. Hero content requirements

### Required visible copy

Top-left hero headline:

```text
Preview first.
Build after.
```

Subcopy:

```text
We draft the first two sections before you commit.
```

Primary CTA:

```text
Get my free preview
```

Secondary CTA:

```text
View examples
```

Navigation:

- SitesBuilder
- by Local Web Works
- Work
- Pricing
- Process
- Contact
- Talk to us
- Get my free preview

### Copy rules

- Use real HTML text for all important copy.
- Do not rely on AI-generated text inside images.
- Keep above-the-fold copy minimal.
- Avoid vague agency language like “digital transformation”, “world-class solutions”, or “unlock your potential”.
- Avoid fake metrics.

---

## 6. Visual requirements

### Overall look

- Premium dark, not pure black.
- Minimal, cinematic, spacious.
- High-end interactive product feeling, not agency-template feeling.
- Strong negative space above and around headline.
- One dominant lower visual stage, not many small decorative cards.

### Palette

Use an analogous cool harmony:

- graphite base;
- smoked charcoal panels;
- cyan primary action;
- teal support highlights;
- soft depth blue atmosphere.

Do not use peach, purple, pink, orange, lime, beige, rainbow, or random neon in the hero direction unless later intentionally approved.

### Materials

Use restrained premium materials:

- dark glass;
- smoked acrylic;
- subtle reflections;
- fine bevels;
- low-opacity cyan/teal glow;
- depth haze;
- liquid-metal or glass-like highlights only where meaningful.

---

## 7. Lower interactive viewport: proof tiles

The lower half of the hero should be an interactive/cinematic viewport built around proof tiles. This viewport is the product metaphor.

### Tile 1: Eraspace

Purpose: show ecommerce/product-discovery redesign proof.

Suggested text:

- Label: `Eraspace`
- Title: `Retail product discovery`
- Detail: `Heavy ecommerce redesign and product-flow work.`

Do not invent metrics.

### Tile 2: Sarathy

Purpose: show rapid app/landing/MVP proof.

Suggested text:

- Label: `Sarathy`
- Title: `Student finance MVP`
- Detail: `Landing page and app flow shaped in four days.`

Only use the “four days” claim because it is already part of the approved context.

### Tile 3: Preview Flow

Purpose: explain the free-preview process visually.

Suggested text:

- Label: `Your preview`
- Title: `First two sections`
- Detail: `Hero + first proof section drafted before you commit.`

### Interaction intent

The proof tiles should not look like a dashboard grid. They should feel like layered objects inside a cinematic preview stage:

- wide desktop: three tiles in depth;
- portrait desktop/tablet: two plus one stacked rhythm;
- mobile tall: one featured tile at a time;
- mobile short: compact stage with minimal parallax.

---

## 8. Dynamic viewport resolver requirement

Responsiveness must not rely on a single mobile/desktop width breakpoint. The layout must respond to viewport shape.

The implementation must read:

- viewport width;
- viewport height;
- aspect ratio;
- `visualViewport.height` when available;
- available vertical space after nav and safe-area insets;
- reduced-motion preference.

The resolver should assign a mode to the root element, for example:

```text
wide-desktop
portrait-desktop
tablet
mobile-tall
mobile-short
```

### Mode behavior

#### wide-desktop

- Huge top-left headline.
- Lower proof viewport begins around the lower half.
- Three proof tiles in depth.
- Full parallax and subtle GSAP choreography enabled.

#### portrait-desktop

- Top-left headline remains large but less wide.
- Lower viewport grows taller.
- Proof tiles use 2+1 stacking.
- Hero min-height capped to avoid huge empty vertical space.

#### tablet

- Compact nav.
- Headline and CTA stay above the viewport.
- Proof tiles use 2+1 or carousel depending height.
- Parallax distance reduced.

#### mobile-tall

- Headline remains expressive.
- CTA visible in first viewport.
- One featured proof tile plus step/swipe affordance.
- Lower stage partially visible before scroll.

#### mobile-short

- Headline compresses with `clamp()`.
- CTA remains visible.
- Lower stage peeks into the viewport but does not crush copy.
- Parallax and ambient motion mostly disabled.

---

## 9. Technical approach

### Stack

- Astro for page structure.
- HTML/CSS for text, navigation, and proof tiles.
- CSS custom properties, `clamp()`, container queries, and viewport units for baseline responsiveness.
- Small client-side viewport resolver using `ResizeObserver`, `matchMedia`, and `visualViewport`.
- GSAP for purposeful hero and scroll choreography.
- Higgsfield/Spline/R3F only as needed for lower-stage visual assets.

### Resolver sketch

```js
const root = document.documentElement;

function resolveViewportMode() {
  const vw = window.innerWidth;
  const vh = window.visualViewport?.height || window.innerHeight;
  const aspect = vw / Math.max(vh, 1);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let mode = 'wide-desktop';
  if (vw < 640 && vh < 680) mode = 'mobile-short';
  else if (vw < 640) mode = 'mobile-tall';
  else if (vw < 980) mode = 'tablet';
  else if (aspect < 0.9 || vh > vw * 1.2) mode = 'portrait-desktop';

  root.dataset.viewportMode = mode;
  root.dataset.reducedMotion = reduced ? 'true' : 'false';
  root.style.setProperty('--vw', `${vw}px`);
  root.style.setProperty('--vh', `${vh}px`);
  root.style.setProperty('--aspect', aspect.toFixed(3));
}

resolveViewportMode();
window.addEventListener('resize', resolveViewportMode, { passive: true });
window.visualViewport?.addEventListener('resize', resolveViewportMode, { passive: true });
```

Actual implementation should debounce/rebuild GSAP timelines safely.

---

## 10. Motion requirements

Motion must clarify the preview-first product story. It must not be generic reveal spam.

### Opening sequence

1. Nav fades/slides in lightly.
2. Huge headline settles from a subtle Y offset.
3. CTA pair appears with a short stagger.
4. Lower proof viewport rises into partial view.
5. Proof tiles establish depth.
6. On scroll, the lower viewport becomes the focus.

### Motion qualities

- Calm, smooth, restrained.
- No bouncy gimmicks.
- No every-card scroll reveal.
- No infinite attention-seeking loops.
- Continuous motion pauses offscreen or under reduced motion.

### Reduced motion

When `prefers-reduced-motion: reduce` is active:

- no parallax;
- no long transitions;
- proof tiles appear statically;
- all content remains accessible and readable.

---

## 11. Functional requirements

- Primary CTA opens the free-preview request path.
- Secondary CTA links to examples/proof section.
- Nav links use stable anchors and do not leave stale hashes when returning to hero.
- Proof tiles must be keyboard accessible.
- Proof tiles must have readable focus states.
- Mobile proof-tile step/swipe must have non-swipe fallback controls.
- No horizontal overflow at any supported viewport.

---

## 12. Performance requirements

- Avoid heavy WebGL by default.
- Build first with HTML/CSS/GSAP.
- Add Spline/R3F only if the lower stage cannot reach the needed depth without it.
- Lazy-load non-critical 3D/assets.
- Respect reduced-motion and low-power contexts.
- Animate transforms and opacity, not layout properties.
- Keep the hero readable before JavaScript hydrates.

---

## 13. Accessibility requirements

- HTML text remains real text.
- Buttons and links are semantic.
- Proof tiles are reachable by keyboard.
- Focus states are visible against dark background.
- Reduced-motion mode is supported.
- Text contrast passes WCAG AA.
- Decorative canvas/visual assets do not hide required content.

---

## 14. SEO and social requirements

- Hero H1 is real text.
- Metadata should reflect the preview-first offer.
- OG image must be regenerated after implementation.
- Verify 1200×630 social frame separately; mobile success is not enough.

---

## 15. Non-goals

- Do not build a no-code editor.
- Do not make the hero look like a SaaS dashboard.
- Do not copy PeachWeb’s assets, objects, palette, or exact interaction.
- Do not add random 3D decoration if it does not explain proof or preview flow.
- Do not add generic agency sections above the fold.
- Do not invent proof metrics.

---

## 16. Acceptance criteria

The implementation is acceptable only if all of these pass:

- First viewport clearly communicates: preview first, build after.
- Hero does not resemble a standard split SaaS landing page.
- Lower stage contains proof tiles, not generic dashboard cards.
- Dynamic viewport resolver changes layout based on width, height, and aspect ratio.
- Desktop, portrait desktop, tablet, mobile tall, and mobile short modes are visibly distinct.
- CTA is visible on 360px and 390px mobile first viewports.
- No horizontal overflow on 360px, 390px, 768px, 1440px, and tall portrait desktop.
- Reduced-motion mode remains usable.
- Build passes.
- Browser screenshot QA passes on desktop and mobile.
- OG/social preview frame is regenerated and inspected.

---

## 17. QA matrix

Minimum viewports:

- 1440×900 wide desktop;
- 1920×1080 wide desktop;
- 900×1600 portrait desktop;
- 768×1024 tablet;
- 390×844 mobile tall;
- 360×640 mobile short;
- 1200×630 OG/social frame.

Checks per viewport:

- headline visible and not cramped;
- CTA visible or intentionally one small scroll away only on constrained cases;
- lower proof viewport visible/peeking;
- proof tile readability;
- no horizontal overflow;
- no clipped nav actions;
- no unreadable text over glow;
- no standard dashboard-grid feeling.

---

## 18. Implementation phases

### Phase 1: Static layout

Build real HTML/CSS hero, nav, headline, CTAs, and proof-tile lower viewport without GSAP.

### Phase 2: Viewport resolver

Add dynamic mode detection and mode-specific CSS variables.

### Phase 3: Motion

Add GSAP opening and scroll choreography per viewport mode.

### Phase 4: Proof polish

Refine proof-tile content, depth, hover/focus, and mobile step/swipe behavior.

### Phase 5: QA and OG

Run build, browser screenshots, reduced-motion checks, overflow checks, and regenerate social preview images.

---

## 19. Open decisions

None blocking. Optional implementation choices:

- whether to keep lower-stage visuals pure HTML/CSS or add Spline/R3F;
- whether proof tiles use real screenshots immediately or stylized dark preview surfaces first;
- exact route/anchor naming for the examples and preview request flow.
