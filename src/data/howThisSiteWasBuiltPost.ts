export const howThisSiteWasBuiltPost = {
  title: "How This Website Was Built and Deployed",
  excerpt:
    "A hardware-engineer's tour of this personal site: what React and Vite actually do, how the repo is organized, and how a git push ends up live on GitHub Pages.",
  date: "Jun 8, 2026",
  readTime: "5 min read",
  slug: "how-this-site-was-built",
  content: `# How This Website Was Built and Deployed

If you design chips or firmware, you already understand build flows, toolchains, and release artifacts. Modern web development uses the same ideas with different names. This post walks through **this** site—[oscarmattia.github.io](https://oscarmattia.github.io)—in terms that map cleanly onto hardware and embedded workflows.

## The big picture: it is a static site

There is no server running Python, Node, or a database when you load the page. GitHub Pages serves **pre-built files**—HTML, JavaScript, CSS, and images—like shipping a binary image to flash memory.

When you visit the site, your browser downloads those files and executes the JavaScript locally to draw the UI. All the "smart" behavior (theme toggle, section navigation, fetching public GitHub repos) runs **client-side**.

![From source code to what the browser loads](/blog/site-stack.svg)

Think of it like this:

| Web term | Hardware or embedded analog |
| :--- | :--- |
| Source in \`src/\` | RTL or C source files |
| \`npm run build\` | Synthesis, place-and-route, or firmware link step |
| \`dist/\` folder | Bitstream, HEX file, or release binary |
| GitHub Pages | CDN hosting the release artifact |
| Browser | Target device executing the image |

## The toolchain (what each piece does)

This project is **Vite + React + TypeScript + Tailwind CSS**. Here is the translation layer:

- **DOM (Document Object Model)** — The browser's in-memory tree of everything on the page: headings, paragraphs, buttons, images, and their hierarchy. You can think of it as the live schematic of the UI the browser is holding, not the source files on disk. Low-level web code often manipulates this tree directly; higher-level tools hide most of that work.
- **React** — A UI framework built on top of the DOM. You write components that describe *what* the UI should look like for a given state (data). When state changes—toggle dark mode, expand a section, load GitHub repos—React figures out the smallest set of DOM updates needed and applies them. Similar in spirit to a reactive state machine driving a display: you specify the desired output, not every low-level write to the panel.
- **TypeScript** — JavaScript with static types. Catches many mistakes before runtime, like a lint rule on steroids.
- **Vite** — The build tool and local dev server. \`npm run dev\` gives you a hot-reloading preview on your machine; \`npm run build\` compiles everything into optimized static files in \`dist/\`.
- **Tailwind CSS** — Utility classes for styling (\`text-sm\`, \`bg-secondary\`, etc.) instead of writing large custom stylesheets. Fast iteration, consistent spacing and colors.
- **React Router** — Handles in-site navigation. The homepage is \`/\`; blog articles live at \`/blog/:slug\`. Only the blog uses separate URLs; the rest is one long scrolling page with section anchors (\`#about\`, \`#gallery\`, etc.).

None of this requires a backend for a portfolio site. That keeps hosting free and maintenance low.

## How the repo is organized

\`\`\`text
oscarmattia.github.io/
├── src/
│   ├── components/     # Reusable UI blocks (Hero, About, Gallery, ...)
│   ├── pages/          # Full pages (home, blog post, 404)
│   ├── data/           # Content (blog posts, publications)
│   └── lib/            # Small helpers (section scroll logic)
├── public/             # Files copied as-is into dist/ (images, favicon)
├── .github/workflows/  # CI/CD: build and deploy on push to main
├── index.html          # Shell page; Vite injects the JS bundle here
└── package.json        # Dependencies and scripts (like a Makefile)
\`\`\`

Content you see on the homepage lives mostly in \`src/components/\`. Blog posts are Markdown strings in \`src/data/\`, rendered at runtime by \`react-markdown\`. Static assets (gallery photos, blog diagrams, favicon) sit in \`public/\` and are referenced by path, e.g. \`/pictures/mountain-fog.jpg\`.

## Local development (edit, preview, repeat)

On your machine:

\`\`\`bash
npm install      # Download dependencies (once, or after package changes)
npm run dev      # Start local preview, typically http://localhost:8080
\`\`\`

Vite watches files and refreshes the browser when you save—similar to re-running a simulation after a parameter tweak, but near-instant for UI work.

When you are happy with changes:

\`\`\`bash
npm run build:pages   # Production build + SPA 404 fallback for GitHub Pages
\`\`\`

That command runs \`vite build\`, which bundles and minifies JavaScript, processes CSS, and writes output to \`dist/\`. It also copies \`index.html\` to \`404.html\` so direct links like \`/blog/how-this-site-was-built\` work on GitHub Pages (otherwise GitHub would return a generic 404).

## Deployment: GitHub Pages + GitHub Actions

The live site is hosted on **GitHub Pages** at the root domain because the repository is named \`oscarmattia.github.io\` (the standard pattern for a personal user site).

Deployment is fully automated. Pushing to \`main\` triggers \`.github/workflows/deploy.yml\`:

![Deploy pipeline on every push to main](/blog/deploy-pipeline.svg)

\`\`\`mermaid
sequenceDiagram
  participant Dev as You (git push)
  participant GH as GitHub
  participant CI as GitHub Actions
  participant Pages as GitHub Pages
  participant Browser as Visitor browser

  Dev->>GH: Push commit to main
  GH->>CI: Run deploy workflow
  CI->>CI: npm ci
  CI->>CI: npm audit (high severity gate)
  CI->>CI: npm run build:pages
  CI->>Pages: Upload dist/ artifact
  Pages->>Browser: Serve static files at oscarmattia.github.io
\`\`\`

Key settings that make this work:

1. **Repo Settings → Pages → Build and deployment → Source: GitHub Actions** (not Jekyll, not a legacy branch upload).
2. The workflow uses minimal permissions (\`pages: write\`, \`id-token: write\`) and publishes the \`dist/\` folder produced by the build job.
3. **Dependabot** watches npm and GitHub Actions dependencies for security updates.

After a green workflow run, changes are live within a minute or two—no manual FTP, no SSH, no server to patch.

## What I changed over time (a realistic workflow)

Building this site was iterative, not a one-shot tape-out:

1. **Content and layout** — Hero, About, publications, gallery, social links.
2. **Branding** — Concentric-circle logo, light/dark theme toggle, section navigator on the right.
3. **GitHub Pages** — Added the deploy workflow, fixed favicons (browsers cache them aggressively), replaced placeholder social preview images.
4. **Blog** — Markdown posts with syntax highlighting and Mermaid diagrams; this article is the first published entry.

Each step was: edit locally → \`npm run dev\` to preview → commit → push → CI deploys. Same rhythm as bring-up on a board, but without a JTAG cable.

## If you want to fork this approach

Minimum viable path for a similar portfolio:

1. Clone the repo and run \`npm install && npm run dev\`.
2. Edit components under \`src/components/\` and content under \`src/data/\`.
3. Put images in \`public/\`.
4. Push to a \`username.github.io\` repository with the workflow enabled.

You do not need to master the entire React ecosystem on day one. Treat components as modular blocks, the build as your release step, and GitHub Actions as automated regression + release to production.

## Summary

| Step | Command or location | Result |
| :--- | :--- | :--- |
| Develop | \`npm run dev\` | Local preview with hot reload |
| Build | \`npm run build:pages\` | Static site in \`dist/\` |
| Deploy | Push to \`main\` | GitHub Actions deploys to GitHub Pages |
| Live URL | [oscarmattia.github.io](https://oscarmattia.github.io) | Public portfolio |

This site is a **static React app**, built with **Vite**, released through **CI/CD to GitHub Pages**. If you have shipped firmware or silicon, you already understand the pattern—you are just swapping the target and toolchain.

---

*Questions or ideas for the next post? Find me on [GitHub](https://github.com/oscarmattia) or [LinkedIn](https://www.linkedin.com/in/oscar-mattia-7170b834/).*
`,
};
