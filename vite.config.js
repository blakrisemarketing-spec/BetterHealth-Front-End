import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { ROUTE_SEO, SITE_URL, DEFAULT_OG_IMAGE, SITE_LASTMOD } from './src/data/seo.js'
import { getOrganizationSchema, getWebSiteSchema, pageUrl } from './src/components/structured-data.js'
import { ARTICLES, articleToPlainText, articleToHtml, getArticle } from './src/data/blog/index.js'

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;')

const jsonLdScript = (block) =>
  `    <script type="application/ld+json">${JSON.stringify(block)}</script>`

const renderJsonLd = (jsonld) => {
  const blocks = Array.isArray(jsonld) ? jsonld : jsonld ? [jsonld] : []
  return blocks.map(jsonLdScript).join('\n')
}

// Sitemap priority by route shape. Homepage is handled separately.
const priorityFor = (route) =>
  route === 'foundation' ? '0.9'
  : route.startsWith('blog/') ? '0.7'
  : /^(privacy|terms|careers|download-app|blog)$/.test(route) ? '0.6'
  : '0.8'

function buildSitemap() {
  const rows = [
    { loc: `${SITE_URL}/`, lastmod: SITE_LASTMOD, priority: '1.0' },
    ...Object.entries(ROUTE_SEO).map(([route, page]) => ({
      loc: pageUrl(route),
      lastmod: page.lastmod || SITE_LASTMOD,
      priority: priorityFor(route),
    })),
  ]
  const body = rows
    .map(
      (u) =>
        `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <priority>${u.priority}</priority>\n  </url>`
    )
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
}

// llms.txt — the curated index AI crawlers (and the llms.txt convention) expect:
// a one-line description, then linked sections. Generated from the same ROUTE_SEO
// + article registry as everything else, so it never drifts from the site.
function buildLlmsTxt() {
  const pages = Object.entries(ROUTE_SEO).filter(([r]) => !r.startsWith('blog/'))
  const posts = Object.entries(ROUTE_SEO).filter(([r]) => r.startsWith('blog/'))
  const line = ([route, page]) =>
    `- [${page.title.split(/[—|]/)[0].trim()}](${SITE_URL}/${route}): ${page.description}`
  return [
    '# BetterHealth Africa',
    '',
    '> Affordable, comprehensive preventive health screening in Ghana — 127 biomarkers across 17 body systems, home or in-lab sample collection, and results in about 48 hours. BetterHealth helps Ghanaians catch conditions like diabetes, hypertension, kidney and liver disease before symptoms appear.',
    '',
    '## Pages',
    ...pages.map(line),
    '',
    '## Health education',
    ...posts.map(line),
    '',
  ].join('\n')
}

// llms-full.txt — fuller plain-text dump for AI engines that ingest one document.
// Marketing pages contribute their meta description; blog articles contribute
// their full flattened body (the citability payload).
function buildLlmsFullTxt() {
  const out = [
    '# BetterHealth Africa — Full Content',
    '',
    'Affordable, comprehensive preventive health screening in Ghana. 127 biomarkers across 17 body systems, home or in-lab sample collection, results in about 48 hours.',
    '',
    '## Site pages',
    '',
  ]
  for (const [route, page] of Object.entries(ROUTE_SEO)) {
    if (route.startsWith('blog/')) continue
    out.push(`### ${page.title.split(/[—|]/)[0].trim()}`, page.description, `URL: ${SITE_URL}/${route}`, '')
  }
  out.push('## Health education articles', '')
  for (const article of ARTICLES) {
    out.push(articleToPlainText(article), `URL: ${SITE_URL}/blog/${article.slug}`, '', '---', '')
  }
  return out.join('\n')
}

// Short label from a full title: "What We Test — BetterHealth Africa" -> "What We Test".
const shortTitle = (title) => title.split(/[—|]/)[0].trim()

// Static internal-link nav baked into every no-JS body fallback, so crawlers and
// AI engines that don't run JS still see the site's internal link graph.
const FALLBACK_NAV =
  '<nav aria-label="Site" class="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[14px] font-heading font-semibold text-primary">' +
  [
    ['/', 'Home'],
    ['/how-it-works', 'How It Works'],
    ['/what-we-test', 'What We Test'],
    ['/pricing', 'Pricing'],
    ['/blog', 'Blog'],
    ['/contact', 'Contact'],
  ]
    .map(([href, label]) => `<a href="${href}">${label}</a>`)
    .join('') +
  '</nav>'

// Lightweight no-JS body for a marketing route: a real <h1> + the page
// description + internal links. Not the full React page — enough that a non-JS
// crawler/AI engine reads the page's purpose and links, and the first paint has
// content. React (createRoot) replaces #root on mount, so there's no mismatch.
const marketingFallback = (page) =>
  '<div class="bg-base min-h-screen"><main class="max-w-[720px] mx-auto px-6 pt-[120px] pb-16">' +
  `<h1 class="text-[2rem] sm:text-[2.5rem] font-extrabold font-heading leading-[1.1] text-text-primary mb-5">${esc(shortTitle(page.title))}</h1>` +
  `<p class="text-[1.05rem] leading-[1.85] text-text-secondary font-body mb-6">${esc(page.description)}</p>` +
  FALLBACK_NAV +
  '</main></div>'

const HOMEPAGE_FALLBACK =
  '<div class="bg-base min-h-screen"><main class="max-w-[720px] mx-auto px-6 pt-[120px] pb-16">' +
  '<h1 class="text-[2rem] sm:text-[2.5rem] font-extrabold font-heading leading-[1.1] text-text-primary mb-5">BetterHealth Africa &mdash; Better health, made accessible.</h1>' +
  '<p class="text-[1.05rem] leading-[1.85] text-text-secondary font-body mb-6">Affordable, comprehensive preventive health screening in Ghana &mdash; 127 biomarkers across 17 body systems, home or in-lab sample collection, and results in about 48 hours. Catch conditions like diabetes, hypertension, kidney and liver disease before symptoms appear.</p>' +
  FALLBACK_NAV +
  '</main></div>'

// Inject a no-JS body into the empty SPA root so crawlers/AI engines and the
// first paint see real content. Blog routes get the full article HTML; marketing
// routes get a heading + description fallback.
const injectBody = (html, bodyHtml) =>
  bodyHtml ? html.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`) : html

// This is a single-page app served by Hostinger/LiteSpeed (which serves
// dist/<route>/index.html as a directory index). Without a real per-route HTML
// file, crawlers and social scrapers (which don't run JS) only ever see
// index.html's homepage meta tags on every route. This plugin writes
// dist/<route>/index.html for every route in ROUTE_SEO (src/data/seo.js) with
// the correct title/description/Open Graph/Twitter/canonical/JSON-LD baked in,
// a static no-JS body (full article HTML for blog posts, a heading+description
// fallback for marketing pages), and generates sitemap.xml + llms.txt /
// llms-full.txt from the same source, so search results, social shares, and AI
// engines all see the right data.
function prerenderSeoPlugin() {
  return {
    name: 'prerender-route-seo',
    apply: 'build',
    closeBundle() {
      const distDir = path.resolve('dist')
      const indexPath = path.join(distDir, 'index.html')
      if (!fs.existsSync(indexPath)) return
      let base = fs.readFileSync(indexPath, 'utf8')

      // Inject site-global JSON-LD (Organization + WebSite) into the base HTML so
      // every page — homepage included — carries the entity graph in static HTML
      // that non-JS crawlers and AI engines can read. The per-route loop below
      // builds on this enriched base, so each route inherits it automatically.
      const globalJsonLd = [getOrganizationSchema(), getWebSiteSchema()]
        .map(jsonLdScript)
        .join('\n')
      base = base.replace('</head>', `${globalJsonLd}\n  </head>`)
      // Homepage index.html gets the homepage no-JS body; the per-route loop
      // below builds on `base` (which keeps an empty #root) so each route can
      // inject its own body without inheriting the homepage's.
      fs.writeFileSync(indexPath, injectBody(base, HOMEPAGE_FALLBACK))

      const setMeta = (html, attr, key, value) => {
        const re = new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`, 'i')
        return re.test(html) ? html.replace(re, `$1${esc(value)}$2`) : html
      }

      for (const [route, page] of Object.entries(ROUTE_SEO)) {
        const url = pageUrl(route)
        const image = page.image || DEFAULT_OG_IMAGE
        let html = base
        html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(page.title)}</title>`)
        html = setMeta(html, 'name', 'description', page.description)
        html = setMeta(html, 'property', 'og:type', page.ogType || 'website')
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
          renderJsonLd(page.jsonld),
        ].filter(Boolean).join('\n')
        html = html.replace('</head>', `${extra}\n  </head>`)

        // No-JS body: full article HTML for blog posts, heading+description for the rest.
        if (route.startsWith('blog/')) {
          const article = getArticle(route.slice('blog/'.length))
          if (article) html = injectBody(html, articleToHtml(article))
        } else {
          html = injectBody(html, marketingFallback(page))
        }

        const outDir = path.join(distDir, route)
        fs.mkdirSync(outDir, { recursive: true })
        fs.writeFileSync(path.join(outDir, 'index.html'), html)
      }

      // Generate sitemap.xml + llms.txt / llms-full.txt from the same data.
      fs.writeFileSync(path.join(distDir, 'sitemap.xml'), buildSitemap())
      fs.writeFileSync(path.join(distDir, 'llms.txt'), buildLlmsTxt())
      fs.writeFileSync(path.join(distDir, 'llms-full.txt'), buildLlmsFullTxt())
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
