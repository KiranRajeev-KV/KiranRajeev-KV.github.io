import { motion } from 'motion/react'
import { ArrowUp } from 'lucide-react'

export function Footer() {
  const year = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative mt-32 border-t border-border px-6 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <div className="font-mono text-xs text-fg-subtle">
            <span>Kiran Rajeev</span>
            <span className="mx-2">·</span>
            <span>{year}</span>
            <span className="mx-2">·</span>
            <span>designed & built by me, with too much coffee.</span>
          </div>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            className="flex items-center gap-1 font-mono text-xs text-fg-muted transition-colors hover:text-fg"
            aria-label="Back to top"
          >
            <span>top</span>
            <ArrowUp className="h-3 w-3" />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
