# oulaidegar

A minimalist, functional, editorial personal website built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS**.

Tailored for an interdisciplinary researcher and builder at the intersection of **Cultural Data & AI**.

---

## Features

- **Aesthetic**: Warm editorial monochrome typography (Newsreader serif + Grotesque sans + Monospace metadata), fine 1px borders, and zero bloat.
- **Master's Thesis in Cultural Data & AI**: Dedicated research section featuring the working title, abstract, core research questions, methodologies, archival datasets, theoretical genealogy, and code artifacts.
- **Projects & Works (`/work`)**: Showcase of software systems, AI models, and creative tools with category filter pills (`AI & Data`, `Research`, `Web & Tools`, `Cultural & Creative`).
- **Essays & Blog (`/writing`)**: Clean distraction-free reading typography, reading times, tags, and static pre-rendering.
- **Field Notes & Digital Garden (`/notes`)**: Atomic thoughts, reading notes, and theoretical marginalia with live search and category filters.
- **Visual Archive (`/visuals`)**: Curated photography stream with a full-screen lightbox (keyboard arrow navigation), metadata (camera/film/location), and an interactive in-browser **Upload / Add Picture** modal with persistent storage.
- **Curriculum Vitae (`/cv`)**: Comprehensive academic and industry CV with clean print layout (`@media print`) and a one-click **Print / Export PDF** button.
- **Theme**: Dark and Light theme toggle (Warm Paper `#faf9f6` / Deep Charcoal `#0f0e0d`).

---

## Project Structure

```
oulaidegar/
├── src/
│   ├── app/
│   │   ├── cv/             # Printable Curriculum Vitae
│   │   ├── notes/          # Digital garden & field notes
│   │   ├── thesis/         # Master's Thesis in Cultural Data & AI
│   │   ├── visuals/        # Photography stream & lightbox
│   │   ├── work/           # Projects & software portfolio
│   │   ├── writing/        # Essays & blog articles
│   │   │   └── [slug]/     # Individual essay reader
│   │   ├── globals.css     # Design tokens, typography & print rules
│   │   ├── layout.tsx      # Global root layout, header, footer, metadata
│   │   └── page.tsx        # Homepage overview & thesis highlight
│   ├── components/
│   │   ├── Header.tsx      # Minimalist sticky nav with active indicators
│   │   ├── Footer.tsx      # Quiet footer with domain info & links
│   │   ├── Icons.tsx       # Pixel-perfect SVG icons
│   │   ├── PhotoGallery.tsx# Gallery & interactive photo uploader
│   │   ├── PhotoLightbox.tsx# Fullscreen image viewer
│   │   ├── ThemeToggle.tsx # Light/dark mode toggle
│   │   └── ThesisHighlight.tsx# Featured thesis banner
│   └── data/
│       ├── cvData.ts       # Structured CV entries (education, experience, talks)
│       ├── notes.ts        # Atomic notes and quotes
│       ├── photos.ts       # Curated photography collection
│       ├── posts.ts        # Blog articles & essays
│       ├── projects.ts     # Portfolio projects & links
│       ├── siteConfig.ts   # General site info, bio & domain
│       └── thesis.ts       # Master's thesis topic, abstract, datasets
├── public/                 # Static assets & photos
└── package.json
```

---

## Managing Content

Everything is configured with clean, type-safe data files in `src/data/`:

| To Update | Edit File |
| :--- | :--- |
| **Site info, links, bio** | `src/data/siteConfig.ts` |
| **Master's Thesis topic & abstract** | `src/data/thesis.ts` |
| **CV / Resume** | `src/data/cvData.ts` |
| **Projects & Works** | `src/data/projects.ts` |
| **Blog posts / Essays** | `src/data/posts.ts` |
| **Field Notes** | `src/data/notes.ts` |
| **Permanent Photos** | Drop files in `public/photos/` and reference in `src/data/photos.ts` |

---

## Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deployment (Custom Domain: `oulaidegar`)

### 1. Vercel (Recommended)
1. Push your repository to GitHub.
2. Import the repository in [Vercel](https://vercel.com).
3. Under **Settings → Domains**, add your domain: `oulaidegar.com` (or your chosen TLD).
4. Configure DNS as instructed by Vercel (`CNAME` or `A` records).

### 2. Static Export
If you want to host on Cloudflare Pages or GitHub Pages:
```bash
npm run build
```
All pages are fully pre-rendered and static.
