import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { VelocityText } from '../components/velocity-text'
import { now } from '../data/now'

export const Route = createFileRoute('/now')({
  component: NowPage,
})

function NowPage() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <main className="min-h-screen px-6 py-32">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <VelocityText as="h1" intensity={0.003}>
            <h1 className="font-serif text-[clamp(2rem,5vw,3.5rem)] text-fg">Now</h1>
          </VelocityText>
          <p className="mt-2 font-mono text-xs text-fg-subtle">Last updated: {now.lastUpdated}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="mt-12 space-y-6 font-serif leading-relaxed text-fg"
        >
          {now.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="mt-12 rounded-lg border border-border p-6"
        >
          <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-fg-subtle">
            Current Stack
          </h3>
          <div className="flex flex-wrap gap-2 font-mono text-sm text-fg">
            {now.currentStack.map((tech) => (
              <span key={tech} className="rounded-full border border-border px-3 py-1">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-12 font-mono text-[10px] text-fg-subtle"
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          // what I'm focused on right now
        </motion.div>
      </div>
    </main>
  )
}
