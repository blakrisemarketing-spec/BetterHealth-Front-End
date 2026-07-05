# SEO Data Tools

Headless wrappers the nightly routine uses to pull live SEO data. All three use
**API-key / service-account auth** (no interactive login) so they run in a cron or
cloud agent. They read credentials from **environment variables only** — never
commit keys. Each prints a clear message and exits non-zero if its credentials are
missing, so the build/content pipeline keeps working without them.

These require Node 18+ (`fetch` is built in). The repo runs Node 22.

## dataforseo.mjs (paid)

```bash
node seo/tools/dataforseo.mjs serp   "what is HbA1c"
node seo/tools/dataforseo.mjs volume "blood test,hba1c test,health screening"
node seo/tools/dataforseo.mjs ideas  "health screening ghana"
```

Env: `DATAFORSEO_LOGIN`, `DATAFORSEO_PASSWORD`. Optional: `DFS_LOCATION_CODE`
(default 2288 = Ghana), `DFS_LANGUAGE_CODE` (default `en`).

## gsc.mjs (free)

```bash
node seo/tools/gsc.mjs queries 28   # top queries, last 28 days
node seo/tools/gsc.mjs pages   28   # top pages
```

Env: `GSC_SERVICE_ACCOUNT_JSON` (the service-account key — see formats below),
`GSC_SITE_URL` (the property, e.g. `https://www.betterhealth.africa/` or
`sc-domain:betterhealth.africa`).

**Setup:** In Google Cloud, create a service account and a JSON key. Enable the
"Google Search Console API". In Search Console → Settings → Users and permissions,
add the service account's `client_email` as a user with at least "Restricted"
(read) access on the property.

**Storing the key in an env var (base64 — recommended).** The downloaded key is
pretty-printed JSON with real line breaks, and single-line env-var fields (the
cloud Routine Environment, most CI UIs) truncate it at the first newline — which
surfaces later as a JSON "parse error at position 1." Base64-encode it to one safe
line instead, and the tool auto-decodes it:

```bash
base64 -i gsc-service-account.json | tr -d '\n'   # macOS/BSD
base64 -w0 gsc-service-account.json               # GNU/Linux
```

Paste the single-line output as `GSC_SERVICE_ACCOUNT_JSON`. `gsc.mjs` accepts the
key in three forms: **base64-of-JSON** (best for env vars), **inline raw JSON**
(only if minified to one line), or a **file path** (local runs).

## bing.mjs (free)

```bash
node seo/tools/bing.mjs queries
node seo/tools/bing.mjs traffic
```

Env: `BING_API_KEY`, `BING_SITE_URL`.

**Setup:** Verify the site in Bing Webmaster Tools, then Settings → API Access →
generate an API key.

## indexnow.mjs (free, no auth)

Pings the IndexNow aggregator so **Bing, Yandex, Seznam, Naver and Yep** re-crawl
changed URLs within minutes instead of waiting on organic discovery. Bing's index
feeds ChatGPT and Copilot, so this doubles as a GEO signal. Google does **not**
use IndexNow — it discovers via the sitemap + crawl, so this complements (doesn't
replace) `sitemap.xml`.

```bash
npm run indexnow                                   # submit every sitemap URL
node seo/tools/indexnow.mjs <url> [<url> ...]      # submit specific URLs
node seo/tools/indexnow.mjs --dry-run [urls...]    # print payload, don't send
```

No env vars or secrets. Ownership is proven by a **public key file** served at the
site root — `public/<key>.txt`, whose contents equal `<key>` (currently
`fff4bd4d7f40b9b4888a2f1fd9a8f1a0`). The script auto-discovers it under `public/`,
so the key can't drift. The key file ships with the normal build (it's in
`public/`), so nothing extra is needed at deploy time. The tool refuses any URL
not on `www.betterhealth.africa` (IndexNow rejects the whole batch otherwise) and
exits non-zero on failure so the nightly routine can gate on it.

**Nightly hook:** after a new article's PR merges and deploys, submit just the new
post so it's crawled immediately, e.g.
`node seo/tools/indexnow.mjs https://www.betterhealth.africa/blog/<new-slug>/`.
(Run it *after* deploy — IndexNow validates the URL is reachable.)

## Where secrets live

For local/manual runs, put them in a git-ignored `.env` (see `.env.example`) and
export them, e.g. `set -a; source .env; set +a`. For the scheduled cloud agent,
configure them as the cron environment's secrets. Never place real keys in the repo.
