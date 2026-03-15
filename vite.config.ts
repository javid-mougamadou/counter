import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  server: {
    host: '0.0.0.0',
  },
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'html-base-assets',
      transformIndexHtml(html) {
        const base = process.env.BASE_PATH ?? '/'
        const baseNorm = base.endsWith('/') ? base : base + '/'
        return html
          .replace(/href="\/assets\//g, `href="${baseNorm}assets/`)
          .replace(/href="\/manifest\.webmanifest/g, `href="${baseNorm}manifest.webmanifest`)
      },
    },
  ],
})
