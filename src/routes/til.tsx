import { createFileRoute } from '@tanstack/react-router'
import { tilPosts } from '../data/til'
import { Section } from '../components/section'

export const Route = createFileRoute('/til')({
  component: TilPage,
})

function TilPage() {
  return (
    <main className="min-h-screen px-6 py-32">
      <div className="mx-auto max-w-3xl">
        <Section>
          <div className="mb-2 flex items-baseline gap-3">
            <h1 className="font-serif text-4xl text-fg">TIL</h1>
            <span className="font-mono text-sm text-fg-subtle">Today I Learned</span>
          </div>
          <p className="mb-12 font-mono text-sm text-fg-muted">
            Small things I learned. Low barrier to write, high signal to readers.
          </p>
        </Section>

        <div className="space-y-0">
          {tilPosts.map((post, i) => (
            <Section key={post.id} delay={0.05 * i}>
              <article className="flex items-start gap-4 border-b border-border py-6">
                <span className="shrink-0 font-mono text-xs text-fg-subtle">{post.date}</span>
                <div>
                  <p className="font-serif leading-relaxed text-fg">{post.content}</p>
                  <span className="mt-2 inline-block rounded-full border border-border px-2 py-0.5 font-mono text-xs text-fg-subtle">
                    {post.tag}
                  </span>
                </div>
              </article>
            </Section>
          ))}
        </div>

        {tilPosts.length === 0 && (
          <div className="py-16 text-center font-mono text-sm text-fg-subtle">
            Nothing here yet. Still learning.
          </div>
        )}
      </div>
    </main>
  )
}
