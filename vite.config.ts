import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base:
    process.env.CUSTOM_DOMAIN === 'true' || process.env.GITHUB_PAGES !== 'true'
      ? '/'
      : `/${process.env.GITHUB_REPOSITORY?.split('/')[1] || 'counter'}/`,
  server: {
    host: '0.0.0.0',
  },
  plugins: [react(), tailwindcss()],
})
