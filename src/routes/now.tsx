import { createFileRoute } from '@tanstack/react-router'
import { Section } from '../components/section'
import { now } from '../data/now'

export const Route = createFileRoute('/now')({
  component: NowPage,
})

function NowPage() {
  return (
    <main className="min-h-screen px-6 py-32">
      <div className="mx-auto max-w-2xl">
        <Section>
          <h1 className="mb-2 font-serif text-4xl text-fg">Now</h1>
          <p className="mb-12 font-mono text-xs text-fg-subtle">Last updated: {now.lastUpdated}</p>
        </Section>

        <Section delay={0.1}>
          <div className="space-y-6 font-serif leading-relaxed text-fg">
            {now.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Section>

        <Section delay={0.2}>
          <div className="mt-12 rounded-lg border border-border p-6">
            <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-fg-subtle">Current Stack</h3>
            <div className="flex flex-wrap gap-2 font-mono text-sm text-fg">
              {now.currentStack.map((tech) => (
                <span key={tech} className="rounded-full border border-border px-3 py-1">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </Section>
      </div>
    </main>
  )
}
