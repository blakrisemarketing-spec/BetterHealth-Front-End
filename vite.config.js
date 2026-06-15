import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

const SITE = 'https://www.betterhealth.africa'

// Routes that need their own static <head> SEO. This is a single-page app served
// by Hostinger/LiteSpeed (which serves dist/<route>/index.html as a directory
// index), so without a real per-route HTML file, crawlers and social scrapers
// (which don't run JS) only ever see index.html's main-site meta tags. This
// plugin writes dist/<route>/index.html with the correct title/description/
// Open Graph/canonical/JSON-LD baked in, so shares and search show the right card.
const PRERENDER = [
  {
    route: 'foundation',
    title: '100 Healthy Years Foundation — Free Health Screening in Ghana',
    description:
      'The 100 Healthy Years Foundation runs free community health screenings across Ghana, catching preventable conditions early. Volunteer, partner, or request a free screening for your community.',
    image: `${SITE}/foundation-og.jpg`,
    jsonld: {
      '@context': 'https://schema.org',
      '@type': 'NGO',
      name: '100 Healthy Years Foundation',
      alternateName: 'BetterHealth Africa Foundation',
      url: `${SITE}/foundation`,
      logo: `${SITE}/foundation-og.jpg`,
      description:
        'Free community health screening for working-age adults in underserved communities across Ghana.',
      areaServed: { '@type': 'Country', name: 'Ghana' },
      sameAs: [
        'https://www.facebook.com/betterhealth.africa',
        'https://www.instagram.com/betterhealth.africa',
        'https://www.x.com/BetterHealthAfrica',
        'https://www.tiktok.com/@betterhealth.africa',
      ],
    },
  },
]

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
        return re.test(html) ? html.replace(re, `$1${value}$2`) : html
      }

      for (const page of PRERENDER) {
        const url = `${SITE}/${page.route}`
        let html = base
        html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${page.title}</title>`)
        html = setMeta(html, 'name', 'description', page.description)
        html = setMeta(html, 'property', 'og:url', url)
        html = setMeta(html, 'property', 'og:title', page.title)
        html = setMeta(html, 'property', 'og:description', page.description)
        html = setMeta(html, 'property', 'og:image', page.image)
        html = setMeta(html, 'property', 'twitter:title', page.title)
        html = setMeta(html, 'property', 'twitter:description', page.description)
        html = setMeta(html, 'property', 'twitter:image', page.image)

        const headExtra =
          `    <link rel="canonical" href="${url}" />\n` +
          `    <meta property="og:site_name" content="100 Healthy Years Foundation" />\n` +
          `    <meta property="og:image:width" content="1200" />\n` +
          `    <meta property="og:image:height" content="630" />\n` +
          `    <meta property="og:image:alt" content="A volunteer runs a free health screening for a smiling community member in Ghana." />\n` +
          `    <script type="application/ld+json">${JSON.stringify(page.jsonld)}</script>\n  </head>`
        html = html.replace('</head>', headExtra)

        const outDir = path.join(distDir, page.route)
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
