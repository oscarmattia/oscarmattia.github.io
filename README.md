# oscarmattia.github.io

Personal portfolio site for Oscar Mattia, PhD — engineering leader and AMS architect. The site presents bio, publications, patents, open-source work, a photo gallery, and a technical blog.

**Live site:** [https://oscarmattia.github.io](https://oscarmattia.github.io)

## Stack

| Layer | Technology |
|-------|------------|
| UI | [React](https://react.dev/) 18 |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Build | [Vite](https://vitejs.dev/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) |
| Routing | [React Router](https://reactrouter.com/) |
| Content | Markdown blog posts, static assets in `public/` |
| Hosting | [GitHub Pages](https://pages.github.com/) via GitHub Actions |

The site is a static SPA: there is no backend. Production builds output HTML, JS, CSS, and assets to `dist/`.

## Local development

Requires Node.js 20+ and npm.

```sh
git clone https://github.com/oscarmattia/oscarmattia.github.io.git
cd oscarmattia.github.io
npm install
npm run dev
```

Open [http://localhost:8080](http://localhost:8080). Vite hot-reloads as you edit files under `src/`.

## Build & deploy

```sh
npm run build:pages   # Production build + SPA 404 fallback for GitHub Pages
npm run preview       # Preview the built site locally
```

Pushes to `main` trigger `.github/workflows/deploy.yml`, which runs `npm ci`, audits dependencies, builds the site, and publishes `dist/` to GitHub Pages.

## Project layout

```
src/components/   UI sections (Hero, About, Portfolio, Gallery, Blog, …)
src/pages/        Route pages (home, blog post, 404)
src/data/         Blog posts and structured content
public/           Static files (images, favicon, blog diagrams)
.github/          Deploy workflow and Dependabot config
```

## License

All rights reserved unless otherwise noted.
