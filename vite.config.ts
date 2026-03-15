import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const GA_GTAG_DEFAULT = 'G-X9WNRTZNX2'

export default defineConfig({
  base:
    process.env.CUSTOM_DOMAIN === 'true' || process.env.GITHUB_PAGES !== 'true'
      ? '/'
      : `/${process.env.GITHUB_REPOSITORY?.split('/')[1] || 'counter'}/`,
  server: {
    host: '0.0.0.0',
  },
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'html-google-env',
      transformIndexHtml(html) {
        const gtagId =
          process.env.GOOGLE_ANALYTICS_GTAG ||
          process.env.VITE_GOOGLE_ANALYTICS_GTAG ||
          GA_GTAG_DEFAULT
        return html.replace(/%GOOGLE_ANALYTICS_GTAG%/g, gtagId)
      },
    },
  ],
})
