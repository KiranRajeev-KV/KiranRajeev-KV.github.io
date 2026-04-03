import { createFileRoute } from '@tanstack/react-router'
import { tilPosts } from '../data/til'
import { Section } from '../components/section'
import { StaggerList } from '../components/stagger-list'
import { TextReveal } from '../components/text-reveal'

export const Route = createFileRoute('/til')({
  component: TilPage,
})

function TilPage() {
  return (
    <main className="min-h-screen px-6 py-32">
      <div className="mx-auto max-w-3xl">
        <Section>
          <div className="mb-2 flex items-baseline gap-3">
            <TextReveal text="TIL" className="font-serif text-4xl text-fg" />
            <span className="font-mono text-sm text-fg-subtle">Today I Learned</span>
          </div>
          <p className="mb-12 font-mono text-sm text-fg-muted">
            Small things I learned. Low barrier to write, high signal to readers.
          </p>
        </Section>

        <StaggerList className="space-y-0" staggerDelay={0.05} yOffset={10}>
          {tilPosts.map((post) => (
            <article
              key={post.id}
              className="flex items-start gap-4 border-b border-border py-6 transition-colors hover:bg-bg-subtle/50"
            >
              <span className="shrink-0 font-mono text-xs text-fg-subtle">{post.date}</span>
              <div>
                <p className="font-serif leading-relaxed text-fg">{post.content}</p>
                <span className="mt-2 inline-block rounded-full border border-border px-2 py-0.5 font-mono text-xs text-fg-subtle">
                  {post.tag}
                </span>
              </div>
            </article>
          ))}
        </StaggerList>

        {tilPosts.length === 0 && (
          <div className="py-16 text-center font-mono text-sm text-fg-subtle">
            Nothing here yet. Still learning.
          </div>
        )}
      </div>
    </main>
  )
}
