import { createFileRoute } from '@tanstack/react-router'
import { Section } from '../components/section'

export const Route = createFileRoute('/now')({
  component: NowPage,
})

function NowPage() {
  return (
    <main className="min-h-screen px-6 py-32">
      <div className="mx-auto max-w-2xl">
        <Section>
          <h1 className="mb-2 font-serif text-4xl text-fg">Now</h1>
          <p className="mb-12 font-mono text-xs text-fg-subtle">Last updated: March 2025</p>
        </Section>

        <Section delay={0.1}>
          <div className="space-y-6 font-serif leading-relaxed text-fg">
            <p>
              I am currently interning at Cloudflare on the edge runtime team, building tooling for Workers. Most of my time goes to understanding V8 isolates, improving cold start times, and writing internal docs that people will actually read.
            </p>
            <p>
              Outside of work, I am iterating on my distributed KV store project — adding snapshot-based log compaction and trying to get Jepsen-style testing to work without losing my mind. It is harder than the paper makes it sound.
            </p>
            <p>
              I am also re-reading <em>Designing Data-Intensive Applications</em> for the second time. It is a completely different book when you have actually tried to build a distributed system.
            </p>
            <p>
              On the personal side: running more, sleeping slightly more, and slowly accepting that my Neovim config will never be finished.
            </p>
          </div>
        </Section>

        <Section delay={0.2}>
          <div className="mt-12 rounded-lg border border-border p-6">
            <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-fg-subtle">Current Stack</h3>
            <div className="flex flex-wrap gap-2 font-mono text-sm text-fg">
              {['Go', 'TypeScript', 'eBPF', 'Cloudflare Workers', 'PostgreSQL', 'Rust (learning)'].map((tech) => (
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
