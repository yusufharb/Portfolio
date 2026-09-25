# Yusuf Hamdy — AI Product Operations

A premium, static portfolio and service website for Yusuf Hamdy's AI-powered
Product Operations service. Built with plain HTML5, CSS3, and vanilla JavaScript —
no frameworks, no build step.

## File Structure

```
/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   └── images/
│       └── og-cover.svg      ← Open Graph cover image
└── README.md
```

Icons use native emoji (no external icon library needed).
Fonts (Fraunces, Inter, IBM Plex Mono) load from Google Fonts and degrade
gracefully to system fonts if offline.

## Running Locally

No build tools required. Either:

1. Open `index.html` directly in a browser, or
2. Serve it locally for the best experience:

   ```bash
   cd yusuf-portfolio
   python3 -m http.server 8080
   # then visit http://localhost:8080
   ```

   Or use any local server (VS Code Live Server, `npx serve`, etc.).

## Deployment

This is a fully static site. Deploy to any static hosting service:

- **GitHub Pages** — push to a `gh-pages` branch or use the repository settings
- **Netlify** — drag and drop the folder, or connect a Git repository
- **Vercel** — import the repository; no build command needed
- **Cloudflare Pages** — connect the repository; output dir = root

No environment variables or build step required.

## Where to Replace Placeholder Content

### Contact Details

In `index.html`, search for `PLACEHOLDER` (3 locations in the Contact section):

| Item | Value / Action |
|---|---|
| Email | `Yu.Hamdy@nu.edu.eg` (Configured) |
| GitHub | `https://github.com/yusufharb` (Configured) |
| LinkedIn | `linkedin.com/in/yusuf-hamdy-placeholder` → Replace with your real LinkedIn URL in `index.html` |

### Canonical URL

In `index.html` `<head>`, replace:
```html
<link rel="canonical" href="#">
```
with your actual deployed URL.

### Open Graph Image

The `og:image` meta tag in `index.html` references `assets/images/og-cover.png`.
An SVG version is provided at `assets/images/og-cover.svg`.

For best social media compatibility, convert the SVG to PNG at **1200×630px**
and save it as `assets/images/og-cover.png`. Then update the meta tag path if
needed. Many social platforms don't render SVG images.

### Contact Form Backend

The form in `js/script.js` is **demo mode only** — it validates input and shows
a success message, but does NOT send any data. The success message clearly
states this.

To make it functional:

**Option A — Formspree (recommended, free tier available):**
1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form and get your endpoint URL
3. In `index.html`, add `action="https://formspree.io/f/YOUR_ID"` and
   `method="POST"` to the `<form>` tag
4. In `js/script.js`, update the submit handler to POST via `fetch()`:
   ```javascript
   const response = await fetch('https://formspree.io/f/YOUR_ID', {
     method: 'POST',
     body: new FormData(form),
     headers: { 'Accept': 'application/json' }
   });
   ```

**Option B — mailto fallback:**
Replace the form with a simple `mailto:` link button.

## Adding Real Case Studies

Case studies live in two places:

1. **`index.html`** — the `<section id="case-studies">` block. Each
   `<article class="case-card">` holds the title, context, highlights,
   task tags, and the visual flow steps (`.case-flow .cf-node`).

2. **`js/script.js`** — the `DOCS` object defines the "View Sample" modal
   content for each case (`case1`, `case2`, `case3`). Add a new key
   (e.g. `case4`) with a `title` and `body`, then add a matching
   `data-modal="case4"` button in the HTML.

**Important:**
- Anything that is not real client work MUST stay labeled "Demonstration
  Project" (the `.tag.demo` badge in HTML) — do not remove that label
  from fictional case studies.
- Never fabricate client names, metrics, revenue, or testimonials.

## Adding Real Deliverable Samples

Deliverable modal content lives in the `DELIVERABLES` array in `js/script.js`.
Each entry has a `key`, `name`, and `body`. The grid on the page is
auto-generated from this array — no HTML changes needed.

To add a new deliverable:
```javascript
{ key: "new-doc", name: "My New Document", body: `CONTENT HERE...` }
```

## Key Interactions

- All animations respect `prefers-reduced-motion`
- Hero workflow auto-animates showing input → processing → output
- Process timeline auto-advances and is clickable
- "Watch the Transformation" section has interactive tabs showing the full
  journey from raw input to QA scenarios
- Deliverables showcase has tabs showing realistic PM tool UI mockups
  (user stories, sprint boards, status reports, change requests)
- Case study "View Sample" buttons and deliverable cards open an accessible
  modal (keyboard-navigable, focus-trapped, closes on Escape/backdrop)
- Mobile menu closes on link click, outside click, and Escape key
- Contact form validates client-side with inline errors; clearly states
  demo mode in success message

## Design System

Colors, typography, spacing, and other tokens are defined as CSS custom
properties in `css/style.css` at the `:root` level. To adjust the brand:

| Variable | Purpose |
|---|---|
| `--accent` | Primary brand color (default: `#6E8CFF`) |
| `--bg` | Page background (default: `#0B0C0E`) |
| `--ink` | Primary text color (default: `#F2F1ED`) |
| `--font-display` | Display/heading font (Fraunces) |
| `--font-body` | Body text font (Inter) |
| `--font-mono` | Monospace font (IBM Plex Mono) |

## Performance Notes

- Zero external JavaScript libraries (no Three.js, jQuery, etc.)
- CSS animations use `transform` and `opacity` for GPU acceleration
- Fonts preconnect for faster loading
- All animations degrade gracefully with `prefers-reduced-motion`
- No images required for core layout (emoji icons, CSS-only visuals)

## Recommended Next Steps

1. **Replace placeholder contact details** with real information
2. **Convert OG SVG to PNG** for social media compatibility
3. **Connect contact form** to Formspree or similar service
4. **Add real case study content** as real client work becomes publishable
5. **Add a professional portrait** to the About section when available
6. **Consider adding**: testimonials (only real ones), measurable outcomes
   (only verified ones), and a pricing/engagement model section
7. **Set up analytics** (Plausible, Fathom, or Google Analytics)
