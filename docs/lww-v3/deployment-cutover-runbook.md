# Local Web Works — Deployment and Cutover Runbook

Status: Phase 0 topology verified on 2026-07-12. Preview isolation is established. Production promotion remains blocked until the release gates and rollback rehearsal are approved.

## Verified topology

### Redesign source

- GitHub repository: `https://github.com/aGamingGod1234/sitesbuilder-full-site`
- GitHub default branch: `main`
- Verified baseline commit: `9933965508144ac6ff7149ccd8f2377309b0a8f4`
- Redesign branch: `redesign/v3`
- Branch protection on `main`: **absent** as of 2026-07-12; protect it before cutover
- Production connection: this repository is **not** the source of the current production deployment

### Isolated preview

- Vercel project: `sitesbuilder-v3-preview`
- Vercel project ID: `prj_XnNY6TiT4BJNeBpx3BlHcXl3pryz`
- Owner/scope: `agaminggods-projects`
- Node.js: 24.x
- Local redesign checkout is linked only to this preview project
- Build contract: committed `vercel.json` → Astro, `npm run build`, output `dist`
- Production/custom aliases: none permitted

### Current production

- Vercel project: `sitesbuilder-store`
- Vercel project ID: `prj_ASWrNi5iCE6u9pGuDrQfKQpMzrXf`
- Current immutable deployment ID: `dpl_DjbGk3kU9hZzdiVXg4Vg6E9qraBn`
- Current immutable deployment URL: `https://sitesbuilder-store-5qhsr0oqv-agaminggods-projects.vercel.app`
- Target/status: production / READY
- Created: 2026-06-27 11:01:48 SGT
- Customer aliases:
  - `https://sitesbuilder.store`
  - `https://www.sitesbuilder.store`
- Project aliases:
  - `https://sitesbuilder-store.vercel.app`
  - `https://sitesbuilder-store-agaminggods-projects.vercel.app`
  - `https://sitesbuilder-store-lucastoh41-7647-agaminggods-projects.vercel.app`
- Runtime: Node.js 24.x
- Responsible owner/operator: Lucas Toh; Hermes may execute only under Lucas’s explicit authorization

### Production-source warning

The current production build logs identify package `agaminggod-com`, not `sitesbuilder-full-site`. Its build occurred after the last pushed `agaminggod-com` commit and the local `C:/Users/lucas/Projects/agaminggod-com` checkout contains extensive uncommitted changes. Therefore the current deployment cannot be mapped reproducibly to a verified Git commit. Do not modify, clean, reset or use that dirty checkout as the redesign base. The immutable deployment ID above is the rollback source of truth.

## Before implementation/cutover

1. Keep all redesign work in the clean `sitesbuilder-full-site` repository on `redesign/v3`.
2. Protect `main` against direct pushes and require passing checks/review before production cutover.
3. Push the redesign branch only after Phase 0 files are committed and all non-performance checks pass.
4. Deploy previews only to `sitesbuilder-v3-preview`; verify it has no production aliases or production-only secrets.
5. Record every preview/RC deployment ID and URL under `artifacts/deploy/<release-id>/commands.txt`.
6. Do not use the dirty `agaminggod-com` checkout for deployment.

## Verified preview commands

Run from a clean `sitesbuilder-full-site` checkout:

```sh
git status --short --branch
git fetch --all --prune
git switch redesign/v3
npm ci
npm run qa:phase0
npx vercel link --yes --project sitesbuilder-v3-preview
npx vercel deploy --yes
```

Then record and inspect the returned immutable preview URL:

```sh
npx vercel inspect <preview-deployment-id-or-url> --format=json
BASE_URL=https://<preview-deployment-url> RELEASE_ID=<release-id> npm run test:e2e
BASE_URL=https://<preview-deployment-url> RELEASE_ID=<release-id> npm run benchmark:lighthouse
```

No production alias may be attached to a preview-project deployment.

## Release candidate in the production project

The accepted build must first become an immutable, non-production candidate in the **existing production project**; promotion works within one project and avoids cross-project alias ambiguity.

From a clean checkout of the accepted, tagged commit:

```sh
git status --porcelain=v1
git rev-parse HEAD
npx vercel link --yes --project sitesbuilder-store
npx vercel deploy --yes
```

Record the returned candidate deployment ID/URL. Run the complete release QA against that immutable URL. Do not continue unless the tree is clean, the commit/tag is recorded, all mandatory automated/manual gates pass, proof/legal records are complete, and rollback has been rehearsed.

## Cutover — selected mechanism

Selected mechanism: promote the accepted immutable deployment inside `sitesbuilder-store`.

```sh
npx vercel promote <accepted-production-project-deployment-id> --yes
npx vercel inspect <accepted-production-project-deployment-id> --format=json
```

Immediately verify and record HTTP status, timestamp and screenshot for:

- `/`, `/pricing`, `/terms`, `/privacy`
- WhatsApp and email actions
- Eraspace/Sarathy links and authorised assets
- old→new redirects and 404/410 behavior
- sitemap, robots, canonicals and structured data
- analytics only if legally approved/enabled
- browser console/network
- production Web Vitals signal

## Deterministic rollback

Primary rollback command, pinned to the currently verified production deployment:

```sh
npx vercel rollback dpl_DjbGk3kU9hZzdiVXg4Vg6E9qraBn --yes
npx vercel inspect dpl_DjbGk3kU9hZzdiVXg4Vg6E9qraBn --format=json
```

Emergency explicit alias restoration if project rollback does not restore both customer aliases:

```sh
npx vercel alias set sitesbuilder-store-5qhsr0oqv-agaminggods-projects.vercel.app sitesbuilder.store
npx vercel alias set sitesbuilder-store-5qhsr0oqv-agaminggods-projects.vercel.app www.sitesbuilder.store
```

After rollback, verify `/`, `/contact` behavior on the restored site, both customer aliases, and the current deployment mapping. Target restoration time: ≤10 minutes.

## Rollback triggers

Rollback immediately for inaccessible primary/legal/contact routes, broken payment/ownership copy, missing proof permissions, widespread visual/interaction failure, incorrect canonical/redirect behavior, exposed secrets, critical console/network failure or mandatory fallback loading 3D.

## Outstanding release blockers

- `main` branch protection is not enabled.
- The preview deployment and production-project RC have not yet been created from a committed Phase 0 branch.
- The exact rollback commands are verified as supported by Vercel CLI 55.0.0 but have not been rehearsed against production; `CUTOVER-001` remains incomplete.
- Legal/privacy publication fields remain incomplete.
- Original Sarathy client-permission evidence remains missing.
- Production mode must be recorded as `CSS/2.5D only` unless WebGL later passes every retained evidence gate.
