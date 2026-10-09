# Outreach Pipelines — Public Website (outreach.piplines.online)

Static, zero-cost marketing + transparency site for **Outreach Pipelines**, an early-stage
technology project for nonprofit outreach. No build step, no backend, no analytics.

- Live domain: `https://outreach.piplines.online`
- Repo: `https://github.com/Rajathk6/Outreach_piplines` (currently holds GPL-3.0 `LICENSE` + this site)
- License: GPL-3.0 (see `LICENSE` on the `main` branch — do not delete it)

## Structure

```
index.html            → /
about/index.html      → /about/
product/index.html    → /product/
impact/index.html     → /impact/
faq/index.html        → /faq/
contact/index.html    → /contact/
privacy/index.html    → /privacy/
terms/index.html      → /terms/
404.html              → custom 404
robots.txt, sitemap.xml, _headers
assets/css/styles.css, assets/js/main.js, favicon.svg
```

Each route is a real directory with an `index.html`, so **direct navigation works** on
Cloudflare Pages with no SPA fallback or redirect rules needed.

## Contact

- Email: `rajath@piplines.online` (existing Cloudflare Email Routing — untouched by this site)
- The `/contact/` form has **no backend**: it validates locally and opens the visitor's
  mail app via `mailto:`. It never claims to send mail itself.

## Cloudflare Pages — exact settings

> Deploy the **GitHub repo**, not a local folder. Push this directory to
> `Rajathk6/Outreach_piplines`, preserving the existing `LICENSE`.

1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**
   → select `Rajathk6/Outreach_piplines`.
2. **Production branch:** `main`
3. **Framework preset:** `None`
4. **Root directory:** `/` (leave empty — the site lives at the repo root)
5. **Build command:** *(leave empty — no build needed)*
6. **Build output directory:** `/` (leave as repo root; `index.html` is at the root)
7. **Environment variables:** none needed.
8. Deploy, then **Custom domains → Set up a custom domain → `outreach.piplines.online`** (the existing apex `piplines.online` stays as-is). Do not change MX / email-routing records.
9. Verify: `/`, `/about/`, `/product/`, `/impact/`, `/faq/`, `/contact/`,
   `/privacy/`, `/terms/` load directly; unknown URL shows the custom 404.

## Local preview

```bash
# any static server from the repo root, e.g.:
python3 -m http.server 8080
# then open http://localhost:8080/
```

## Maintenance notes

- The privacy policy and terms are written generically (no provider-specific
  retention periods, no governing jurisdiction stated). If those details ever
  need to be pinned down, update `/privacy/` and `/terms/` first.
- No analytics installed; if you ever add any, update `/privacy/` before it goes live.
