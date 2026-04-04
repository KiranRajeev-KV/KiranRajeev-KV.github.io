import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect } from 'react'
import { blogPosts } from '../../data/blog'
import { Section } from '../../components/section'
import { StaggerList } from '../../components/stagger-list'
import { useSearch, type SearchItem } from '../../context/search-context'
import { SearchTrigger } from '../../components/search-trigger'
import { TextReveal } from '../../components/text-reveal'
import { VelocityText } from '../../components/velocity-text'

function formatReadTime(wordCount: number): string {
  if (wordCount <= 0) return ''
  const minutes = Math.ceil(wordCount / 200)
  return `${minutes} min`
}

export const Route = createFileRoute('/blog/')({
  component: BlogPage,
})

function BlogPage() {
  const featured = blogPosts.find((p: { featured: boolean }) => p.featured)
  const rest = blogPosts.filter((p: { featured: boolean }) => !p.featured)
  const { setItems } = useSearch()

  useEffect(() => {
    const searchItems: SearchItem[] = blogPosts.map((p) => ({
      id: p.slug,
      type: 'blog',
      title: p.title,
      subtitle: p.category,
      description: p.teaser,
      url: `/blog/${p.slug}`,
      tags: [p.category],
      accent: p.categoryColor,
    }))
    setItems(searchItems)
  }, [setItems])

  const featuredReadTime = featured ? formatReadTime(featured.wordCount) : ''
  const featuredMeta = [featured?.category, featured?.date, featuredReadTime].filter(Boolean)

  return (
    <main className="min-h-screen px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <Section>
          <div className="mb-12 flex items-center justify-between">
            <div>
              <VelocityText as="h1" intensity={0.003}>
                <TextReveal
                  text="Writing"
                  className="font-serif text-[clamp(2rem,5vw,3.5rem)] text-fg"
                />
              </VelocityText>
              <p className="mt-2 font-serif text-base text-fg-muted">
                Thoughts on systems, design, and building things from scratch.
              </p>
            </div>
            <SearchTrigger />
          </div>
        </Section>

        {featured && (
          <Section className="mb-16">
            <Link to="/blog/$slug" params={{ slug: featured.slug }} className="group block">
              <div className="mb-3 flex items-center gap-3 font-mono text-xs text-fg-subtle">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: featured.categoryColor }}
                />
                {featuredMeta.map((item, i) => (
                  <span key={item}>
                    {item}
                    {i < featuredMeta.length - 1 && <span>·</span>}
                  </span>
                ))}
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

        <StaggerList className="space-y-0" staggerDelay={0.05} yOffset={10}>
          {rest.map((post) => {
            const readTime = formatReadTime(post.wordCount)
            const meta = [post.category, post.date, readTime].filter(Boolean)
            return (
              <Link
                key={post.slug}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="group flex items-start justify-between border-b border-border py-6"
              >
                <div>
                  <div className="mb-1.5 flex items-center gap-3 font-mono text-xs text-fg-subtle">
                    <span
                      className="inline-block h-2 w-2 rounded-full"
                      style={{ backgroundColor: post.categoryColor }}
                    />
                    {meta.map((item, j) => (
                      <span key={item}>
                        {item}
                        {j < meta.length - 1 && <span>·</span>}
                      </span>
                    ))}
                  </div>
                  <h3 className="relative inline-block font-serif text-lg text-fg">
                    {post.title}
                    <span className="absolute bottom-0 left-0 h-px w-0 bg-fg transition-all duration-300 group-hover:w-full" />
                  </h3>
                </div>
                <span className="mt-1 font-mono text-fg-subtle transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            )
          })}
        </StaggerList>

        {blogPosts.length === 0 && (
          <div className="py-16 text-center font-mono text-sm text-fg-subtle">No writing yet.</div>
        )}
      </div>
    </main>
  )
}
