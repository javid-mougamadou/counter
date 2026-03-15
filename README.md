# Counter PWA

Counter is a mobile-first PWA for multiple mini counters. Create counters, set an initial value, and increment or decrement them. Built with React, TypeScript, Vite, TailwindCSS, and DaisyUI. Offline-ready with LocalStorage persistence and light/dark theme.

## Getting Started

```bash
npm install
npm run dev
```

Then open `http://localhost:5173`.

### With Docker

```bash
docker compose up -d
docker compose exec web sh
npm run dev
```

Then open `http://localhost:5173`.

## Production Build

```bash
npm run build
npm run preview
```

## Quality & Testing

- Lint: `npm run lint`
- Unit tests: `npm run test`
- Full check (lint + test + build): `npm run validate`

## Features

- Add counters with a name and optional initial value
- Increment (tap value or +) and decrement (−)
- Three view modes: Cards, List (with drag-and-drop reorder), Carousel
- LocalStorage persistence (counters and view mode survive refresh)
- Light/dark theme
- Reset all counters

## Favicon & PWA icons

Generate favicon and PWA icons at [favicon.io](https://favicon.io/favicon-generator/) using font **ABeeZee**, then place the contents of the `favicon_io` archive in `public/assets/`.

## Repo setup & CI

- **Git init** (configurable branch): `GIT_INITIAL_BRANCH=main ./scripts/init-git.sh` — see [docs/CREATION_DEPOT.md](docs/CREATION_DEPOT.md).
- **GitHub description & topics**: [docs/REPO_DESCRIPTION.md](docs/REPO_DESCRIPTION.md).
- **CI / Deploy**: [.github/workflows/deploy.yml](.github/workflows/deploy.yml) (reference copy in [reference/github-actions/](reference/github-actions/)).
