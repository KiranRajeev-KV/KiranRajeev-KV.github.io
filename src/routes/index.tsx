import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect } from 'react'
import { KineticText } from '../components/kinetic-text'
import { Typewriter } from '../components/typewriter'
import { AmbientGrid } from '../components/ambient-grid'
import { ScrollNudge } from '../components/scroll-nudge'
import { Section } from '../components/section'
import { ContactSection } from '../components/contact-section'
import { VelocityText } from '../components/velocity-text'
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
    for (let i = allItems.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[allItems[i], allItems[j]] = [allItems[j], allItems[i]]
    }
    setItems(allItems)
  }, [setItems])

  const showcaseProjects = projects.filter((p) => p.showcase)

  return (
    <>
      {/* Hero — asymmetric editorial layout */}
      <section className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 md:px-12">
        <AmbientGrid />

        <div className="relative z-10 mx-auto w-full max-w-6xl">
          {/* Large serif title spanning 2/3, metadata in 1/3 */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr] md:gap-12">
            <div className="flex flex-col justify-end">
              <VelocityText
                className="font-serif font-bold tracking-tight text-fg"
                as="h1"
                intensity={0.004}
              >
                <KineticText
                  text="Kiran Rajeev"
                  className="block text-[clamp(2.5rem,8vw,6rem)] leading-[0.95]"
                />
              </VelocityText>
              <div className="mt-4">
                <Typewriter
                  phrases={[
                    'building things that matter.',
                    'shipping code that lasts.',
                    'solving problems that hurt.',
                    'turning complexity into simplicity.',
                    'writing software with intention.',
                  ]}
                />
              </div>
            </div>

            <div className="flex flex-col justify-end md:pb-2">
              <nav className="flex flex-col gap-2 font-mono text-sm text-fg-muted">
                <Link
                  to="/projects"
                  search={{ open: undefined }}
                  className="w-fit underline decoration-border underline-offset-4 transition-colors hover:text-fg hover:decoration-fg-subtle"
                >
                  projects
                </Link>
                <Link
                  to="/about"
                  className="w-fit underline decoration-border underline-offset-4 transition-colors hover:text-fg hover:decoration-fg-subtle"
                >
                  about
                </Link>
                <Link
                  to="/blog"
                  className="w-fit underline decoration-border underline-offset-4 transition-colors hover:text-fg hover:decoration-fg-subtle"
                >
                  writing
                </Link>
                <a
                  href="https://github.com/KiranRajeev-KV"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit transition-colors hover:text-fg"
                >
                  github
                </a>
              </nav>
            </div>
          </div>
        </div>

        <ScrollNudge />
      </section>

      {/* Expertise — asymmetric 3-column with sticky labels */}
      <section className="px-6 py-32 md:px-12">
        <div className="mx-auto max-w-6xl">
          <Section>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-[auto_1fr_auto] md:gap-8">
              {[
                {
                  label: '01',
                  title: 'Systems',
                  desc: 'Distributed systems, databases, OS internals',
                },
                {
                  label: '02',
                  title: 'Web',
                  desc: 'Full-stack apps with TanStack, React, and Go',
                },
                {
                  label: '03',
                  title: 'AI',
                  desc: 'LLM pipelines, Whisper, vector search, on-device inference',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="group border-t border-border pt-4 md:border-l md:border-t-0 md:pl-6"
                >
                  <span className="font-mono text-[10px] text-fg-subtle">{item.label}</span>
                  <VelocityText as="h3" intensity={0.002}>
                    <h3 className="mt-1 font-serif text-xl text-fg">{item.title}</h3>
                  </VelocityText>
                  <p className="mt-1 text-sm text-fg-muted">{item.desc}</p>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* Selected Projects — editorial asymmetric grid */}
      <section className="px-6 py-32 md:px-12">
        <div className="mx-auto max-w-6xl">
          <Section delay={0.1}>
            <div className="mb-12 flex items-baseline justify-between border-b border-border pb-4">
              <h2 className="font-mono text-xs uppercase tracking-widest text-fg-subtle">
                Selected Projects
              </h2>
              <Link
                to="/projects"
                search={{ open: undefined }}
                className="font-mono text-xs text-fg-muted underline decoration-border underline-offset-4 transition-colors hover:text-fg hover:decoration-fg-subtle"
              >
                view all
              </Link>
            </div>
          </Section>

          <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2">
            {showcaseProjects.map((project, index) => (
              <Section key={project.id} delay={0.1 + index * 0.08}>
                <Link
                  to="/projects"
                  search={{ open: project.id }}
                  className="group relative block bg-bg p-8 transition-colors hover:bg-bg-elevated min-h-[240px] flex flex-col justify-between"
                >
                  <div
                    className="mb-4 h-px w-8 bg-[var(--accent)] transition-all duration-300 group-hover:w-16"
                    style={{ '--accent': project.accent } as React.CSSProperties}
                  />
                  <VelocityText as="h3" intensity={0.002}>
                    <h3 className="font-serif text-2xl text-fg">{project.title}</h3>
                  </VelocityText>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs tracking-wide text-fg-muted transition-all group-hover:border-[var(--accent)]/30 group-hover:text-fg"
                        style={{ '--accent': project.accent } as React.CSSProperties}
                      >
                        <span className="h-1 w-1 rounded-full bg-[var(--accent)] opacity-40 transition-opacity group-hover:opacity-100" />
                        {tech}
                      </span>
                    ))}
                  </div>
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
