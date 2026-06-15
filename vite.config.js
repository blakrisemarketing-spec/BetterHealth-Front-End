import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { ROUTE_SEO, SITE_URL, DEFAULT_OG_IMAGE } from './src/data/seo.js'

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;')

// This is a single-page app served by Hostinger/LiteSpeed (which serves
// dist/<route>/index.html as a directory index). Without a real per-route HTML
// file, crawlers and social scrapers (which don't run JS) only ever see
// index.html's homepage meta tags on every route. This plugin writes
// dist/<route>/index.html for every route in ROUTE_SEO (src/data/seo.js) with
// the correct title/description/Open Graph/Twitter/canonical/JSON-LD baked in,
// so search results and shares show the right card per page.
function prerenderSeoPlugin() {
  return {
    name: 'prerender-route-seo',
    apply: 'build',
    closeBundle() {
      const distDir = path.resolve('dist')
      const indexPath = path.join(distDir, 'index.html')
      if (!fs.existsSync(indexPath)) return
      const base = fs.readFileSync(indexPath, 'utf8')

      const setMeta = (html, attr, key, value) => {
        const re = new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`, 'i')
        return re.test(html) ? html.replace(re, `$1${esc(value)}$2`) : html
      }

      for (const [route, page] of Object.entries(ROUTE_SEO)) {
        const url = `${SITE_URL}/${route}`
        const image = page.image || DEFAULT_OG_IMAGE
        let html = base
        html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(page.title)}</title>`)
        html = setMeta(html, 'name', 'description', page.description)
        html = setMeta(html, 'property', 'og:url', url)
        html = setMeta(html, 'property', 'og:title', page.title)
        html = setMeta(html, 'property', 'og:description', page.description)
        html = setMeta(html, 'property', 'og:image', image)
        html = setMeta(html, 'property', 'twitter:title', page.title)
        html = setMeta(html, 'property', 'twitter:description', page.description)
        html = setMeta(html, 'property', 'twitter:image', image)
        // canonical: replace if present, else inject
        if (/<link\s+rel="canonical"/i.test(html)) {
          html = html.replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/i, `$1${url}$2`)
        } else {
          html = html.replace('</head>', `    <link rel="canonical" href="${url}" />\n  </head>`)
        }

        const extra = [
          `    <meta property="og:image:alt" content="${esc(page.imageAlt || page.title)}" />`,
          page.jsonld
            ? `    <script type="application/ld+json">${JSON.stringify(page.jsonld)}</script>`
            : '',
        ].filter(Boolean).join('\n')
        html = html.replace('</head>', `${extra}\n  </head>`)

        const outDir = path.join(distDir, route)
        fs.mkdirSync(outDir, { recursive: true })
        fs.writeFileSync(path.join(outDir, 'index.html'), html)
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), prerenderSeoPlugin()],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'vendor-react';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-motion';
            }
            if (id.includes('lucide-react') || id.includes('react-helmet-async')) {
              return 'vendor-ui';
            }
          }
        },
      },
    },
  },
})
