# Agent instructions

Personal portfolio site (Vite + React + TypeScript). Deploys to GitHub Pages on push to `main` via `.github/workflows/deploy.yml`.

## Before committing or pushing

Run the same checks CI runs so deploy does not fail on unrelated changes:

```sh
npm audit --audit-level=high && npm run build:pages
```

The deploy workflow runs `npm ci`, then `npm audit --audit-level=high`, then `npm run build:pages`. A passing local `npm run build` alone is not enough — dependency audit failures block deploy even when the app builds.

After dependency changes, run `npm ci` locally if you want to mirror CI exactly.
