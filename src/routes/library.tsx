import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { libraryItems } from '../data/library'
import { Section } from '../components/section'
import { LibraryCard } from '../components/library-card'

const filterOptions = ['All', 'Books', 'Papers', 'Articles']

const typeMap: Record<string, 'book' | 'paper' | 'article'> = {
  Books: 'book',
  Papers: 'paper',
  Articles: 'article',
}

export const Route = createFileRoute('/library')({
  component: LibraryPage,
})

function LibraryPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filtered = activeFilter === 'All'
    ? libraryItems
    : libraryItems.filter((item) => item.type === typeMap[activeFilter])

  return (
    <main className="min-h-screen px-6 py-32">
      <div className="mx-auto max-w-3xl">
        <Section>
          <h1 className="mb-2 font-serif text-4xl text-fg">Library</h1>
          <p className="mb-8 font-serif text-base text-fg-muted">
            Books, papers, and things that shaped how I think.
          </p>
          <p className="mb-6 font-mono text-xs text-fg-subtle">
            {libraryItems.length} items
          </p>
        </Section>

        <Section delay={0.05}>
          <div className="relative mb-8 flex items-center gap-1 font-mono text-sm">
            {filterOptions.map((option, i) => (
              <motion.button
                key={option}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => {
                  setActiveFilter(option)
                  setExpandedId(null)
                }}
                className={`relative px-3 py-1.5 transition-colors ${
                  activeFilter === option
                    ? 'text-fg'
                    : 'text-fg-muted hover:text-fg'
                }`}
              >
                {option}
                {activeFilter === option && (
                  <motion.div
                    layoutId="library-filter-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-fg"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </Section>

        <div className="flex flex-col gap-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: i * 0.02 }}
              >
                <LibraryCard
                  item={item}
                  expanded={expandedId === item.id}
                  onToggle={() => setExpandedId(expandedId === item.id ? null : item.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center font-mono text-sm text-fg-subtle">
            Nothing in this category yet.
          </div>
        )}
      </div>
    </main>
  )
}
