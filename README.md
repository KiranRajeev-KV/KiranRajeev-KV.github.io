# Portfolio

A personal portfolio site with a "terminal meets editorial" aesthetic. Monospace meets serif, precise grid with intentional breaks. Dark-only, animation-heavy, and obsessively designed.

**Live:** [KiranRajeev-KV.github.io](https://KiranRajeev-KV.github.io)

## Tech Stack

- **Framework:** React 19 + Vite 8 + TypeScript (strict)
- **Routing:** TanStack Router (file-based, type-safe)
- **Styling:** Tailwind CSS v4 with custom CSS theme variables
- **Animation:** Motion (v12) — spring physics, layout animations, page transitions
- **Content:** MDX for blog posts, typed TS files for all other data
- **Search:** Fuse.js fuzzy search via `Cmd+K` command palette
- **Linting:** oxlint (fast, 93 rules)
- **Formatting:** Prettier
- **Git Hooks:** Husky + lint-staged
- **CI/CD:** GitHub Actions (type check, lint, format, build, deploy)
- **Icons:** Lucide React
- **Package Manager:** Bun

## Getting Started

```bash
# Install dependencies
bun install

# Start dev server
bun dev

# Build for production
bun run build

# Preview production build
bun run preview

# Lint code
bun run lint

# Format code
bun run format
```

## Project Structure

```
src/
├── routes/              # File-based routes (TanStack Router)
│   ├── __root.tsx       # Root layout (nav, cursor, search, footer)
│   ├── index.tsx        # Home — kinetic text, typewriter, showcase
│   ├── about.tsx        # About — bio, skills, timeline
│   ├── projects.tsx     # Projects — card grid, drawer, abandoned
│   ├── library.tsx      # Library — books, papers, articles
│   ├── blog/            # Blog — index + MDX post renderer
│   ├── til.tsx          # TIL — micro-posts feed
│   ├── now.tsx          # Now — current focus
│   └── 404.tsx          # Terminal-style 404
├── components/          # Reusable UI components
├── data/                # All content as typed TS files
├── content/             # MDX blog posts
├── context/             # React contexts (search, cursor)
├── hooks/               # Custom hooks (search, intersection)
└── styles/              # Global CSS + Tailwind theme
```

## Features

- **Kinetic text** — glyph-scramble name reveal on first load (sessionStorage)
- **Custom cursor** — terminal-style blinking caret, toggleable, desktop-only
- **Command palette** — `Cmd+K` fuzzy search across projects, blog, and library
- **Responsive nav** — floating pill on desktop, bottom tab bar on mobile
- **Mobile warning** — terminal-style overlay on small viewports
- **Scroll animations** — fade + slide up via IntersectionObserver
- **Project drawer** — slide-in panel with problem/solution/lessons
- **Library catalog** — expandable cards with personal notes, per-type filtering
- **MDX blog** — custom prose styling, code blocks with copy-on-hover, table of contents
- **Dark-only theme** — warm dark palette, no toggle
- **Table of contents** — auto-generated from headings with scroll tracking
- **GitHub Pages** — auto-deploy on push to main via GitHub Actions

## Code Quality

- **oxlint** — Fast linting (93 rules, ~12ms)
- **Prettier** — Code formatting (no semicolons, single quotes, 100 char width)
- **Husky** — Pre-commit hooks run lint-staged on staged files
- **CI Pipeline** — Type check, lint, format check, and build on every push/PR

## Adding Content

### Projects

Edit `src/data/projects.ts`. Each project has `showcase: true` to appear on the homepage.

### Library Items

Edit `src/data/library.ts`. Supports `book`, `paper`, and `article` types with `read`/`reading`/`queued` status.

### Blog Posts

1. Add metadata to `src/data/blog.ts`
2. Create an `.mdx` file in `src/content/` with the matching slug
3. Set `wordCount` for read time calculation (`wc -w src/content/<slug>.mdx`)

### TIL Entries

Edit `src/data/til.ts`. Keep entries to 1-3 sentences.

### Now Page

Edit `src/data/now.ts`. Update `lastUpdated`, `paragraphs`, and `currentStack`.

### About Page

Edit `src/data/about.ts`. Skills are a `Record<string, Skill[]>` — add any new category and it renders automatically.

## Deployment

This site is deployed to GitHub Pages. Pushes to `main` trigger an automatic build and deploy via GitHub Actions.

## License

MIT
