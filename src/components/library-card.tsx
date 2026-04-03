import { useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import type { LibraryItem } from '../data/library'

const typeIcons = {
  book: (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  ),
  paper: (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
  article: (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
    </svg>
  ),
}

const statusColors = {
  read: 'bg-green-500',
  reading: 'bg-yellow-500',
  queued: 'bg-fg-subtle',
}

const statusLabels = {
  read: 'Read',
  reading: 'Reading',
  queued: 'Queued',
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
      className={`group relative rounded-lg border border-border transition-colors ${
        isExpandable ? 'cursor-pointer' : ''
      } ${
        expanded
          ? 'bg-bg-subtle'
          : isExpandable
            ? 'bg-bg-elevated hover:bg-bg-subtle'
            : 'bg-bg-elevated'
      }`}
      style={{ borderLeftWidth: '3px', borderLeftColor: item.accent }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-2">
              <span className="flex items-center gap-1 rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-fg-subtle">
                {typeIcons[item.type]}
                {item.type}
              </span>
              <span className={`h-1.5 w-1.5 rounded-full ${statusColors[item.status]}`} />
              <span className="font-mono text-[10px] text-fg-subtle">
                {statusLabels[item.status]}
              </span>
            </div>
            <h3 className="font-serif text-lg leading-snug text-fg">
              {item.title}
            </h3>
            <p className="mt-0.5 font-mono text-xs text-fg-muted">
              {item.author} · {item.year}
            </p>
          </div>
          {isExpandable && (
            <motion.span
              className="mt-1 shrink-0 font-mono text-fg-subtle"
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </motion.span>
          )}
        </div>

        <p className="mt-3 font-serif text-sm leading-relaxed text-fg-muted">
          {item.note}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-bg px-2 py-0.5 font-mono text-[10px] text-fg-subtle"
            >
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
              <div className="border-t border-border px-5 pb-5 pt-4">
                {item.fullNote && (
                  <p className="font-serif text-sm leading-relaxed text-fg">
                    {item.fullNote}
                  </p>
                )}
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="mt-4 inline-flex items-center gap-1 font-mono text-xs text-accent underline decoration-border underline-offset-4 transition-colors hover:text-accent-hover"
                  >
                    View source
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  )
}
