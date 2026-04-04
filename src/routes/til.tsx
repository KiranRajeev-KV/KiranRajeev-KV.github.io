import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { tilPosts } from '../data/til'
import { StaggerList } from '../components/stagger-list'
import { TextReveal } from '../components/text-reveal'
import { VelocityText } from '../components/velocity-text'

export const Route = createFileRoute('/til')({
  component: TilPage,
})

function TilPage() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <main className="min-h-screen px-6 py-32">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-2 flex items-baseline gap-3">
            <VelocityText as="h1" intensity={0.003}>
              <TextReveal text="TIL" className="font-serif text-[clamp(2rem,5vw,3.5rem)] text-fg" />
            </VelocityText>
            <span className="font-mono text-sm text-fg-subtle">Today I Learned</span>
          </div>
          <p className="mb-12 font-mono text-sm text-fg-muted">
            Small things I learned. Low barrier to write, high signal to readers.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          <StaggerList className="space-y-0" staggerDelay={0.05} yOffset={8}>
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
        </motion.div>

        {tilPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={loaded ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="py-16 text-center font-mono text-sm text-fg-subtle"
          >
            Nothing here yet. Still learning.
          </motion.div>
        )}

        <motion.div
          className="mt-12 font-mono text-[10px] text-fg-subtle"
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          // {tilPosts.length} things learned so far
        </motion.div>
      </div>
    </main>
  )
}
