# SitesBuilder QA Summary

Viewport QA performed against local static build at `http://127.0.0.1:4327/`.

Screenshots:

- `qa/qa-desktop-1440.png`
- `qa/qa-mobile-390.png`
- `qa/qa-mobile-short-360.png`
- `qa/qa-og-1200x630.png`

Initial checked conditions:

- 1440x900: `wide-desktop`, no horizontal overflow, CTA visible, proof viewport peeking, 3 active proof tiles.
- 1920x1080: `wide-desktop`, no horizontal overflow, CTA visible, proof viewport peeking, 3 active proof tiles.
- 900x1600: `portrait-desktop`, no horizontal overflow, CTA visible, proof viewport peeking, 3 active proof tiles.
- 768x1024: `tablet`, no horizontal overflow, CTA visible, proof viewport peeking, 3 active proof tiles.
- 390x844: `mobile-tall`, no horizontal overflow, CTA visible, proof viewport peeking, 1 active proof tile.
- 360x640: `mobile-short`, no horizontal overflow, CTA visible, proof viewport peeking, 1 active proof tile.
- 1200x630: `wide-desktop`, no horizontal overflow, CTA visible, hero captured for OG frame.

Build command: `npm run build` passed with 0 errors, 0 warnings, 0 hints.

Additional interaction checks:

- Reduced motion at 390x844: `data-reduced-motion=true`, no horizontal overflow, CTA visible, proof viewport peeking, 1 active proof tile.
- Mobile proof controls at 390x844: next/previous buttons switch active proof tile and update `aria-hidden` correctly.
- Browser console after rebuild: 0 errors, 0 warnings.
