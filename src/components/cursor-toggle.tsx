import { motion } from 'motion/react'
import { useCursor } from '../context/cursor-context'
import { MousePointer2, MousePointer2Off } from 'lucide-react'

export function CursorToggle() {
  const { enabled, toggle } = useCursor()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="absolute top-4 right-4 z-20 hidden md:block"
    >
      <button
        onClick={toggle}
        className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-bg-elevated/60 backdrop-blur-sm transition-colors hover:border-fg-subtle hover:bg-bg-elevated/80"
        aria-label={enabled ? 'Disable custom cursor' : 'Enable custom cursor'}
      >
        <span className="absolute -left-16 -translate-x-1/2 whitespace-nowrap rounded border border-border bg-bg-elevated px-2.5 py-1 font-mono text-[10px] text-fg-subtle opacity-0 transition-opacity group-hover:opacity-100">
          {enabled ? 'disable cursor' : 'enable cursor'}
        </span>

        <motion.div
          key={enabled ? 'on' : 'off'}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.15 }}
        >
          {enabled ? (
            <MousePointer2 className="h-4 w-4 text-fg-muted transition-colors group-hover:text-fg" />
          ) : (
            <MousePointer2Off className="h-4 w-4 text-fg-muted transition-colors group-hover:text-fg" />
          )}
        </motion.div>
      </button>
    </motion.div>
  )
}
