# SitesBuilder by Local Web Works

A static Astro website for a preview-first web design service. Visitors can browse work, pricing, and the process, then request a preview through WhatsApp or email. There is no form backend or required API key.

## Local development

Use Node.js 24 LTS (also specified in `.nvmrc` and `package.json`) and npm.

```bash
npm ci
npm run dev
```

Open the local address printed by Astro. The development and preview servers bind to `127.0.0.1`.

```bash
npm run check    # Astro and TypeScript diagnostics
npm run build    # Diagnostics followed by the production build
npm run preview  # Serve the built site locally
```

The build writes static files to `dist/`. GitHub Actions runs a clean install and the production build on pull requests and pushes to `main`. The checked-in `vercel.json` uses the same build command and output directory.

TypeScript stays on the latest compatible 6.0 patch because `@astrojs/check` currently declares support for TypeScript 5 and 6. Recheck its peer dependencies before moving to TypeScript 7.

## Pages and source

| Route | Purpose |
| --- | --- |
| `/` | Homepage with animated proof cards |
| `/work/` | Live project examples |
| `/pricing/` | Website packages |
| `/process/` | Preview, approval, and build workflow |
| `/contact/` | WhatsApp and email contact |
| `/free-preview/` | Preview request instructions and contact links |

- `src/pages/`: route content.
- `src/data/site.ts`: navigation, copy, packages, proof assets, and contact links.
- `src/layouts/BaseLayout.astro`: shared metadata and page shell.
- `src/scripts/hero.ts`: viewport modes, proof controls, and motion.
- `src/styles/global.css`: shared visual design and responsive layout.
- `public/`: static assets, social images, `robots.txt`, and `sitemap.xml`.

The canonical production origin is `https://sitesbuilder.store`, configured in `astro.config.mjs`. Canonical URLs, social metadata, and structured data use that setting. If the production domain or routes change, update the static `public/robots.txt` and `public/sitemap.xml` too.

Pricing links carry the chosen package into the preview page’s WhatsApp and email drafts when JavaScript is available. Unknown package values keep the generic enquiry links.

The proof cards support mobile previous/next buttons and swipes, keyboard links, and reduced motion. Without JavaScript, both cards and the page sections remain readable.

## Design references

`PRD-SitesBuilder-Immersive-Hero.md`, `SitesBuilder-Immersive-Hero-HTML-Plan.html`, and the reports in `qa/` are historical design and manual QA records. Their screenshots and check results describe earlier versions, not the current build.
