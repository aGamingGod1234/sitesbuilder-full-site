# SitesBuilder Immersive Hero Project

Created: 2026-07-04

This project contains the planning documents for the SitesBuilder by Local Web Works immersive homepage hero implementation.

## Files

- `PRD-SitesBuilder-Immersive-Hero.md` — product requirements document for the implementation.
- `SitesBuilder-Immersive-Hero-HTML-Plan.html` — browser-readable visual/technical implementation plan.

## Target direction

The hero is not a standard SaaS split layout. It follows a PeachWeb-inspired pattern without copying PeachWeb: minimal floating nav, oversized top-left type, tiny CTA pair, and a large lower interactive proof-tile viewport that extends below the fold.

## Desktop sync note

The requested Desktop machine target is `desktop` / `AGAMINGGOD`, expected path:

`C:/Users/aGamingGod/Desktop/sitesbuilder-immersive-hero-project/`

At creation time SSH to `desktop` timed out, so this copy was staged on the current Hermes host at:

`C:/Users/lucas/Desktop/sitesbuilder-immersive-hero-project/`

Sync the folder to AGAMINGGOD once the desktop machine is online.


## Build output

The project now includes a standalone Astro implementation of the immersive proof-tile hero.

Run:

```bash
npm install
npm run build
npm run dev
```

Key implementation files:

- `src/pages/index.astro`
- `src/styles/global.css`
- `src/scripts/hero.ts`
- `public/assets/proof-*.svg`
- `public/assets/favicon.svg`
