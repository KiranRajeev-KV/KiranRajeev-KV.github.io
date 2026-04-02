import { createFileRoute, Link } from '@tanstack/react-router'
import { KineticText } from '../components/kinetic-text'
import { Typewriter } from '../components/typewriter'
import { AmbientGrid } from '../components/ambient-grid'
import { ScrollNudge } from '../components/scroll-nudge'
import { Section } from '../components/section'
import { ContactSection } from '../components/contact-section'
import { CursorToggle } from '../components/cursor-toggle'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <>
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
        <AmbientGrid />
        <CursorToggle />
        <div className="relative z-10 flex flex-col items-center gap-6 text-center">
          <KineticText
            text="Alex Chen"
            className="font-serif text-5xl font-bold tracking-tight text-fg sm:text-7xl md:text-8xl"
          />
          <Typewriter phrases={['building things that matter.']} />
          <div className="mt-4 flex items-center gap-4 font-mono text-sm text-fg-muted">
            <Link to="/projects" className="underline decoration-border underline-offset-4 hover:decoration-fg-subtle">
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
            <h2 className="mb-8 font-mono text-xs uppercase tracking-widest text-fg-subtle">Selected Work</h2>
          </Section>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              { title: 'Syscall Tracer', desc: 'A lightweight Linux syscall tracer built with eBPF', stack: 'C · eBPF · Go', accent: '#f59e0b' },
              { title: 'Distributed KV Store', desc: 'Raft-based key-value store with linearizable reads', stack: 'Go · gRPC · Raft', accent: '#10b981' },
            ].map((project, i) => (
              <Section key={project.title} delay={0.1 + i * 0.1}>
                <Link
                  to="/projects"
                  className="group block rounded-lg border border-border p-6 transition-all hover:border-fg-subtle hover:shadow-sm"
                  style={{ '--accent': project.accent } as React.CSSProperties}
                >
                  <div className="mb-2 h-0.5 w-8 bg-[var(--accent)] transition-all group-hover:w-12" />
                  <h3 className="font-serif text-xl text-fg">{project.title}</h3>
                  <p className="mt-1 text-sm text-fg-muted">{project.desc}</p>
                  <p className="mt-3 font-mono text-xs text-fg-subtle">{project.stack}</p>
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
