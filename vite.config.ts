import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/* Netlify exposes the site's address as URL during builds. It is used for
   the canonical link and the absolute social-card image, which link
   previews require. Locally both fall back to harmless relative values. */
function siteMeta(): Plugin {
  const url = (process.env.URL || '').replace(/\/$/, '')
  return {
    name: 'site-meta',
    transformIndexHtml(html) {
      return html
        .replace('%SITE_CANONICAL%', url ? `<link rel="canonical" href="${url}/" />` : '')
        .replace('%SITE_URL%/og.jpg', url ? `${url}/og.jpg` : './og.jpg')
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), siteMeta()],
  base: './',
})
