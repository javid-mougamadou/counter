# Public Assets

This directory contains static assets copied to the root of the build output.

## Required for PWA

- `manifest.webmanifest` – PWA manifest (configured for Counter)
- `service-worker.js` – Service worker for offline support
- `robots.txt` – SEO robots file
- `sitemap.xml` – Sitemap for SEO

## Icons (favicon + PWA)

Icons are in `assets/`, intégrés depuis le dossier racine **`favicon_io/`** (générés avec [favicon.io](https://favicon.io/)). Pour mettre à jour : remplacer les fichiers dans `favicon_io/` puis les recopier dans `public/assets/`.

- `assets/favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png` – favicons
- `assets/apple-touch-icon.png` – Apple touch icon
- `assets/android-chrome-192x192.png`, `android-chrome-512x512.png` – PWA (manifest)
