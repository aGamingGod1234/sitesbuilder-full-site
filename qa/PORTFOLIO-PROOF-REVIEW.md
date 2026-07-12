# Portfolio Proof Visual Review

Reviewed: 2026-07-12
Reviewer: Hermes visual QA
Capture manifest: `public/assets/portfolio-v3/manifest.json`

## Result

All four final WebP crops pass pixel-level publication QA. This review is hash-bound; any recapture changes the hash and requires a fresh review.

| Project | Crop | SHA-256 | Result | Notes |
|---|---|---|---|---|
| Eraspace | Hero | `1f78b84c516164b079e9f0ee480c5e6d8a4e5a4173107f860bc41244f0a4b84c` | PASS | Storefront hero visible; no popup, counter, loading/debug state or personal data. Product/brand imagery is part of the authorised source capture. |
| Eraspace | Collections | `f6cfef634a85af0ab4c2d682ea9d3c2c91b8d0c40d33d89b706545b08b2a73a9` | PASS | Collection-discovery cards and labels visible; transient `0` counter excluded; no overlay or personal data. Rightmost carousel card is naturally partial and must be framed as a detail crop. |
| Sarathy | Hero | `680fc5248c9074d2c7fdf6be2217532f9b06636524d5925386f0980121f5b3ce` | PASS | Landing hero visible; layered category cards are intentional composition; no personal data, unsupported metric or debug state. |
| Sarathy | Features | `1569923fab60e5ec9cfc61ff52f4d35ad5b58d7da049b3818d8eacdc8d839980` | PASS | Core MVP feature area visible and readable; no personal data, unsupported metric or debug/loading state. |

## Permission boundary

- Eraspace is an internal Local Web Works demonstration project; Lucas Toh confirmed internal-owner permission.
- Sarathy is a paid client project. Lucas Toh attested that publication permission exists, but the original client permission artefact, permitted channels and revocation contact remain required before public use.

## Fail-closed rule

Do not publish a crop whose SHA-256 differs from this table until a fresh pixel review is recorded. Sarathy remains blocked from public use until its original written permission record is stored.
