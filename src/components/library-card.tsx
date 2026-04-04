import { useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Plus, Hash } from 'lucide-react'
import type { LibraryItem } from '../data/library'

const typeLabels = {
  book: 'BOOK',
  paper: 'PAPER',
  article: 'ARTICLE',
}

const statusLabels = {
  read: 'READ',
  reading: 'READING',
  queued: 'QUEUED',
}

const statusColors: Record<string, string> = {
  read: 'oklch(0.72 0.16 162)',
  reading: 'oklch(0.77 0.18 85)',
  queued: 'oklch(0.39 0.002 280)',
}

interface LibraryCardProps {
  item: LibraryItem
  expanded: boolean
  onToggle: () => void
}

export function LibraryCard({ item, expanded, onToggle }: LibraryCardProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const isExpandable = !!(item.fullNote || item.link)

  return (
    <motion.div
      layout
      onClick={isExpandable ? onToggle : undefined}
      className={`group relative transition-colors ${isExpandable ? 'cursor-pointer' : ''} ${
        expanded
          ? 'bg-bg-subtle'
          : isExpandable
            ? 'bg-bg-elevated hover:bg-bg-subtle'
            : 'bg-bg-elevated hover:bg-bg-subtle/50'
      }`}
      style={{ borderLeftWidth: '4px', borderLeftColor: item.accent }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      <div className="px-6 py-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="mb-3 flex items-center gap-2 font-mono text-[10px] tracking-widest">
              <span className="text-fg-subtle">{typeLabels[item.type]}</span>
              <span className="text-fg-subtle">·</span>
              <span style={{ color: statusColors[item.status] }}>{statusLabels[item.status]}</span>
              <span className="text-fg-subtle">·</span>
              <span className="text-fg-subtle">{item.year}</span>
            </div>

            <h3 className="font-serif text-xl leading-snug text-fg">{item.title}</h3>
            <p className="mt-1 font-mono text-xs text-fg-muted">{item.author}</p>
          </div>

          {isExpandable && (
            <motion.div
              className="shrink-0 text-fg-subtle transition-colors group-hover:text-fg"
              animate={{ rotate: expanded ? 45 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <Plus className="h-4 w-4" />
            </motion.div>
          )}
        </div>

        <p className="mt-4 font-serif text-sm leading-relaxed text-fg-muted">{item.note}</p>

        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs tracking-wide text-fg-muted">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 transition-colors group-hover:text-fg"
            >
              <Hash className="h-3 w-3" style={{ color: item.accent, opacity: 0.6 }} />
              {tag}
            </span>
          ))}
        </div>
      </div>

      {isExpandable && (
        <AnimatePresence>
          {expanded && (
            <motion.div
              ref={contentRef}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              <div className="border-t border-border px-6 pb-5 pt-4">
                {item.fullNote && (
                  <motion.p
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ delay: 0.08, duration: 0.2 }}
                    className="font-serif text-sm leading-relaxed text-fg"
                  >
                    {item.fullNote}
                  </motion.p>
                )}
                {item.link && (
                  <motion.a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ delay: 0.16, duration: 0.2 }}
                    className="mt-4 inline-flex items-center gap-1 font-mono text-xs text-fg-muted underline decoration-border underline-offset-4 transition-colors hover:text-fg hover:decoration-fg-subtle"
                  >
                    View source
                    <span className="transition-transform group-hover:translate-x-0.5">→</span>
                  </motion.a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  )
}
