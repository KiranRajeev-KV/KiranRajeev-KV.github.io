import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect } from 'react'
import { KineticText } from '../components/kinetic-text'
import { Typewriter } from '../components/typewriter'
import { AmbientGrid } from '../components/ambient-grid'
import { ScrollNudge } from '../components/scroll-nudge'
import { Section } from '../components/section'
import { ContactSection } from '../components/contact-section'
import { CursorToggle } from '../components/cursor-toggle'
import { useSearch, type SearchItem } from '../context/search-context'
import { projects } from '../data/projects'
import { libraryItems } from '../data/library'
import { blogPosts } from '../data/blog'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const { setItems } = useSearch()

  useEffect(() => {
    const allItems: SearchItem[] = [
      ...projects.map((p) => ({
        id: p.id,
        type: 'project' as const,
        title: p.title,
        subtitle: p.stack.join(' · '),
        description: p.description,
        url: '/projects',
        tags: p.stack,
        accent: p.accent,
      })),
      ...libraryItems.map((item) => ({
        id: item.id,
        type: item.type as 'book' | 'paper' | 'article',
        title: item.title,
        subtitle: `${item.author} · ${item.year}`,
        description: item.note,
        url: '/library',
        tags: item.tags,
        accent: item.accent,
        scrollToId: `library-${item.id}`,
      })),
      ...blogPosts.map((p) => ({
        id: p.slug,
        type: 'blog' as const,
        title: p.title,
        subtitle: p.category,
        description: p.teaser,
        url: `/blog/${p.slug}`,
        tags: [p.category],
        accent: p.categoryColor,
      })),
    ]
    // Shuffle so results are mixed, not grouped by type
    for (let i = allItems.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[allItems[i], allItems[j]] = [allItems[j], allItems[i]]
    }
    setItems(allItems)
  }, [setItems])

  return (
    <>
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
        <AmbientGrid />
        <CursorToggle />
        <div className="relative z-10 flex flex-col items-center gap-6 text-center">
          <KineticText
            text="Kiran Rajeev"
            className="font-serif text-5xl font-bold tracking-tight text-fg sm:text-7xl md:text-8xl"
          />
          <Typewriter phrases={[
            'building things that matter.',
            'systems that scale.',
            'code that lasts.',
            'tools people actually use.',
            'software with intention.',
          ]} />
          <div className="mt-4 flex items-center gap-4 font-mono text-sm text-fg-muted">
            <Link to="/projects" search={{ open: undefined }} className="underline decoration-border underline-offset-4 hover:decoration-fg-subtle">
              projects
            </Link>
            <span className="text-fg-subtle">/</span>
            <Link to="/about" className="underline decoration-border underline-offset-4 hover:decoration-fg-subtle">
              about
            </Link>
            <span className="text-fg-subtle">/</span>
            <Link to="/blog" className="underline decoration-border underline-offset-4 hover:decoration-fg-subtle">
              writing
            </Link>
            <span className="text-fg-subtle">/</span>
            <a href="https://github.com/KiranRajeev-KV" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-fg">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
        <ScrollNudge />
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <Section>
            <div className="grid gap-8 md:grid-cols-3">
              {['Systems', 'Web', 'ML'].map((label) => {
                const descMap: Record<string, string> = {
                  Systems: 'Distributed systems, OS internals, low-level tooling',
                  Web: 'Full-stack apps with intentional design and performance',
                  ML: 'Neural nets from scratch, practical model deployment',
                }
                return (
                <div key={label} className="group border-l border-border pl-4">
                  <h3 className="font-mono text-sm font-medium text-fg">{label}</h3>
                  <p className="mt-1 text-sm text-fg-muted">{descMap[label]}</p>
                </div>
                )
              })}
            </div>
          </Section>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <Section delay={0.1}>
            <h2 className="mb-8 font-mono text-xs uppercase tracking-widest text-fg-subtle">Selected Projects</h2>
          </Section>
          <div className="grid gap-6 md:grid-cols-2">
            {projects.filter((p) => p.showcase).map((project, i) => (
              <Section key={project.id} delay={0.1 + i * 0.1}>
                <Link
                  to="/projects"
                  search={{ open: project.id }}
                  className="group block rounded-lg border border-border p-6 transition-all hover:border-fg-subtle hover:shadow-sm"
                  style={{ '--accent': project.accent } as React.CSSProperties}
                >
                  <div className="mb-2 h-0.5 w-8 bg-(--accent) transition-all group-hover:w-12" />
                  <h3 className="font-serif text-xl text-fg">{project.title}</h3>
                  <p className="mt-1 text-sm text-fg-muted">{project.description}</p>
                </Link>
              </Section>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  )
}
