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
- **Unofficial redesign proposal.** Not affiliated directly with the ZARR EOP Project.
  All content references the official service at zarr.eopf.copernicus.eu.
