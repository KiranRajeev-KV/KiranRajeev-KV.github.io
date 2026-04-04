import { createFileRoute, Link } from '@tanstack/react-router'
import { blogPosts } from '../../data/blog'
import { MDXProvider } from '@mdx-js/react'
import { Section } from '../../components/section'
import { ReadingProgress } from '../../components/reading-progress'

const mdxModules = import.meta.glob('../../content/*.mdx', { eager: true })

export const Route = createFileRoute('/blog/$slug')({
  component: BlogPostPage,
  errorComponent: BlogPostError,
  notFoundComponent: BlogPostNotFound,
})

function BlogPostError() {
  return (
    <main className="min-h-screen px-6 py-32">
      <div className="mx-auto max-w-2xl">
        <Section>
          <h1 className="font-mono text-lg text-fg">$ cd /post-you-wanted</h1>
          <p className="mt-2 font-mono text-sm text-fg-muted">bash: no such file or directory</p>
        </Section>
      </div>
    </main>
  )
}

function BlogPostNotFound() {
  return (
    <main className="min-h-screen px-6 py-32">
      <div className="mx-auto max-w-2xl">
        <Section>
          <h1 className="font-mono text-lg text-fg">$ cd /post-you-wanted</h1>
          <p className="mt-2 font-mono text-sm text-fg-muted">bash: no such file or directory</p>
          <Link
            to="/blog"
            className="mt-4 inline-block font-mono text-sm text-fg-muted underline decoration-border underline-offset-4 transition-colors hover:text-fg"
          >
            ← back to writing
          </Link>
        </Section>
      </div>
    </main>
  )
}

function BlogPostPage() {
  const { slug } = Route.useParams()
  const post = blogPosts.find((p) => p.slug === slug)
  const MDXContent = (mdxModules[`../../content/${slug}.mdx`] as { default: React.ComponentType })
    ?.default

  if (!MDXContent) {
    return <BlogPostNotFound />
  }

  const readTime = post?.wordCount ? `${Math.ceil(post.wordCount / 200)} min` : ''
  const meta = [post?.category, post?.date, readTime].filter(Boolean)

  return (
    <main className="min-h-screen px-6 py-32">
      <ReadingProgress />
      <div className="mx-auto max-w-[65ch]">
        {post && (
          <Section>
            <div className="mb-8 flex items-center gap-3 font-mono text-xs text-fg-subtle">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: post.categoryColor }}
              />
              {meta.map((item, i) => (
                <span key={item}>
                  {item}
                  {i < meta.length - 1 && <span>·</span>}
                </span>
              ))}
            </div>
            <h1 className="mb-8 font-serif text-4xl text-fg">{post.title}</h1>
          </Section>
        )}
        <Section delay={0.1}>
          <article className="prose prose-lg max-w-none font-serif leading-[1.75] text-fg [&>p:first-of-type]:first-letter:float-left [&>p:first-of-type]:first-letter:mr-3 [&>p:first-of-type]:first-letter:mt-1 [&>p:first-of-type]:first-letter:font-serif [&>p:first-of-type]:first-letter:text-6xl [&>p:first-of-type]:first-letter:leading-none [&>p:first-of-type]:first-letter:text-fg">
            <MDXProvider
              components={{
                p: (props) => <p className="mb-4" {...props} />,
                h2: (props) => <h2 className="mt-12 mb-4 font-serif text-2xl text-fg" {...props} />,
                h3: (props) => <h3 className="mt-8 mb-3 font-serif text-xl text-fg" {...props} />,
                code: (props) => {
                  const isInline =
                    typeof props.children === 'string' && !props.children?.toString().includes('\n')
                  if (isInline) {
                    return (
                      <code
                        className="rounded bg-bg-subtle px-1.5 py-0.5 font-mono text-sm"
                        {...props}
                      />
                    )
                  }
                  return (
                    <div className="group relative my-6 overflow-hidden rounded-lg border border-border">
                      <div className="flex items-center justify-between border-b border-border bg-bg-elevated/50 px-4 py-2">
                        <span className="font-mono text-[10px] text-fg-subtle">code</span>
                        <button
                          onClick={() => {
                            const text = props.children?.toString() || ''
                            navigator.clipboard.writeText(text)
                          }}
                          className="rounded border border-border bg-bg-subtle px-2 py-0.5 font-mono text-[10px] text-fg-subtle opacity-0 transition-opacity hover:text-fg group-hover:opacity-100"
                        >
                          copy
                        </button>
                      </div>
                      <pre className="overflow-x-auto bg-bg-subtle p-4 font-mono text-sm">
                        <code {...props} />
                      </pre>
                    </div>
                  )
                },
                a: (props) => (
                  <a
                    {...props}
                    className="group/a relative inline-block text-accent underline-offset-4"
                  >
                    {props.children}
                    <span className="pointer-events-none absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-accent/40 transition-transform duration-200 group-hover/a:scale-x-100" />
                  </a>
                ),
                blockquote: (props) => (
                  <blockquote
                    className="my-8 border-l-2 border-accent/40 bg-bg-subtle/30 py-4 pl-5 font-serif italic text-fg-muted"
                    {...props}
                  />
                ),
              }}
            >
              <MDXContent />
            </MDXProvider>
          </article>
        </Section>
      </div>
    </main>
  )
}
