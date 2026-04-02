import { createFileRoute, Link } from '@tanstack/react-router'
import { blogPosts } from '../../data/blog'
import { Section } from '../../components/section'

export const Route = createFileRoute('/blog/')({
  component: BlogPage,
})

function BlogPage() {
  const featured = blogPosts.find((p: { featured: boolean }) => p.featured)
  const rest = blogPosts.filter((p: { featured: boolean }) => !p.featured)

  return (
    <main className="min-h-screen px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <Section>
          <h1 className="mb-12 font-serif text-4xl text-fg">Writing</h1>
        </Section>

        {featured && (
          <Section className="mb-16">
            <Link to="/blog/$slug" params={{ slug: featured.slug }} className="group block">
              <div className="mb-3 flex items-center gap-3 font-mono text-xs text-fg-subtle">
                <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: featured.categoryColor }} />
                <span>{featured.category}</span>
                <span>·</span>
                <span>{featured.date}</span>
                <span>·</span>
                <span>{featured.readTime}</span>
              </div>
              <h2 className="font-serif text-3xl text-fg transition-colors group-hover:text-fg-muted">
                {featured.title}
              </h2>
              <p className="mt-3 font-serif text-base leading-relaxed text-fg-muted">
                {featured.teaser}
              </p>
            </Link>
          </Section>
        )}

        <div className="space-y-0">
          {rest.map((post, i) => (
            <Section key={post.slug} delay={0.05 * i}>
              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="group flex items-start justify-between border-b border-border py-6"
              >
                <div>
                  <div className="mb-1.5 flex items-center gap-3 font-mono text-xs text-fg-subtle">
                    <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: post.categoryColor }} />
                    <span>{post.category}</span>
                    <span>·</span>
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="relative inline-block font-serif text-lg text-fg">
                    {post.title}
                    <span className="absolute bottom-0 left-0 h-px w-0 bg-fg transition-all duration-300 group-hover:w-full" />
                  </h3>
                </div>
                <span className="mt-1 font-mono text-fg-subtle transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </Section>
          ))}
        </div>
      </div>
    </main>
  )
}
