# EOPF Sentinel Zarr Samples — Website Redesign Proposal

A redesigned website for the [EOPF Sentinel Zarr Samples Service](https://zarr.eopf.copernicus.eu/),
built as a pure static site (HTML + CSS + JS — no build step, no dependencies).

Applies the **EOPF Design System v1.0** tokens:
fonts (Exo 2, Open Sans, Roboto Mono), Deep Space colour palette,
4 px baseline grid, and DS border-radius / button / navigation specs.

---

## Project structure

```
eopf-zarr-site/
├── index.html          # Single-page app — all four pages in one file
├── css/
│   └── styles.css      # Full DS token implementation
├── js/
│   └── main.js         # Navigation, code tabs, copy button, newsletter
└── README.md
```

---

## Running locally

No build step required. Just open `index.html` in a browser, or serve with
any static file server:

```bash
# Python (built-in)
python -m http.server 8080

# Node (npx)
npx serve .

# VS Code
# Install the "Live Server" extension, right-click index.html → Open with Live Server
```

Then visit `http://localhost:8080`.

---

## Deploying to GitHub Pages

### Option A — Deploy from the `main` branch root (simplest)

1. Push this folder to a GitHub repository:

```bash
git init
git add .
git commit -m "feat: initial EOPF Zarr site redesign"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

2. In the repository on GitHub:
   - Go to **Settings → Pages**
   - Under **Source**, select **Deploy from a branch**
   - Branch: `main` / folder: `/ (root)`
   - Click **Save**

3. Your site will be live at:
   `https://<your-username>.github.io/<repo-name>/`

GitHub Pages typically takes 1–3 minutes for the first deploy.

---

### Option B — Deploy from a `gh-pages` branch

```bash
git checkout -b gh-pages
git push origin gh-pages
```

Then set **Settings → Pages → Source** to the `gh-pages` branch.

---

### Option C — GitHub Actions (auto-deploy on push)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      - id: deployment
        uses: actions/deploy-pages@v4
```

With this workflow, every push to `main` automatically redeploys the site.
In **Settings → Pages**, set source to **GitHub Actions**.

---

## Custom domain (optional)

To use a custom domain (e.g. `zarr-redesign.example.org`):

1. Create a file named `CNAME` in the repo root:
   ```
   zarr-redesign.example.org
   ```
2. Add a CNAME DNS record pointing to `<your-username>.github.io`.
3. GitHub Pages will automatically provision HTTPS via Let's Encrypt.

---

## Design tokens (EOPF DS v1.0)

| Token          | Value     | Usage                       |
|----------------|-----------|-----------------------------|
| `--base-900`   | `#00111A` | Darkest bg (footer, nav)    |
| `--base-700`   | `#002130` | Page background             |
| `--base-600`   | `#00283C` | Section / card surfaces     |
| `--pri-500`    | `#00AE9D` | Pure Teal — primary CTA     |
| `--pri-400`    | `#5CCBC0` | Links, active states        |
| `--sec-500`    | `#009BDB` | Trusty Azure — info         |
| `--ter-500`    | `#FBAB18` | Enlight Yellow — warning    |
| `--r-full`     | `9999px`  | Buttons, pills              |
| `--r-lg`       | `16px`    | Cards                       |
| `--r-md`       | `8px`     | Code blocks, small items    |
| `--font-head`  | Exo 2     | All headings (Bold 700)     |
| `--font-body`  | Open Sans | Body copy (Regular 400)     |
| `--font-mono`  | Roboto Mono | Code (Regular 400)        |

---

## Pages

| Route   | Content                                              |
|---------|------------------------------------------------------|
| `#home` | Hero, SAFE→Zarr comparison, audience paths, getting started |
| `#data` | STAC browser preview, code access, plugin grid       |
| `#learn`| Learning path, webinar archive, newsletter           |
| `#about`| Why Zarr, conversion pipeline, consortium team       |

Navigation is handled client-side by `js/main.js` — no server required.
All external links open in `target="_blank"` with `rel="noopener"`.

---

## Notes

- **No framework, no bundler.** Pure HTML/CSS/JS — works on any static host.
- **Fonts load from Google Fonts CDN.** Offline use requires downloading and
  self-hosting Exo 2, Open Sans, and Roboto Mono.
- **Unofficial redesign proposal.** Not affiliated with ESA or Copernicus.
  All content references the official service at zarr.eopf.copernicus.eu.
