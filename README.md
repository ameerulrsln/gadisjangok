# Gadis Jangok

Landing site for the Gadis Jangok creative art community, built with **React + Vite**.

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start dev server (http://localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview the production build locally
```

## Project structure

```
index.html                 # HTML shell + SEO/Open Graph meta + font links
public/                    # static assets served at the site root (logo, favicon)
src/
  main.jsx                 # React entry point
  App.jsx                  # page composition (all sections in order)
  styles/global.css        # all site styles (design tokens in :root)
  data/content.js          # editable content: workshops, events, gallery, collabs, links
  components/
    Nav.jsx                # fixed nav, hide-on-scroll-down behavior
    Hero.jsx               # hero section
    Workshops.jsx          # workshop cards (data-driven)
    About.jsx              # about + stats
    Gallery.jsx            # gallery grid (data-driven)
    Events.jsx             # upcoming & past events (data-driven)
    Collab.jsx             # collaborators carousel (autoplay + arrows + dots)
    ContactUs.jsx          # feedback form → Google Sheets
    Footer.jsx             # footer
```

## Editing content

Most text and images live in [`src/data/content.js`](src/data/content.js) — edit there rather than
touching the components. Drop workshop/event/collab photos into `public/images/` (referenced as
`images/<name>.jpg`); missing images hide automatically.

The feedback form posts to a Google Apps Script Web App — update `SHEET_URL` in
`src/data/content.js` to point at your own endpoint.

## Deploying

Run `npm run build` and deploy the generated `dist/` folder to any static host
(Netlify, Vercel, GitHub Pages, Cloudflare Pages, etc.).
