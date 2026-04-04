import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown, BookOpen, BookMarked } from 'lucide-react'
import { libraryItems } from '../data/library'
import { LibraryCard } from '../components/library-card'
import { TextReveal } from '../components/text-reveal'
import { VelocityText } from '../components/velocity-text'
import { useSearch, type SearchItem } from '../context/search-context'
import { SearchTrigger } from '../components/search-trigger'

const typeFilterOptions = ['All', 'Books', 'Papers', 'Articles']
const statusFilterOptions = ['All', 'Reading', 'Read', 'Queued']

const typeMap: Record<string, 'book' | 'paper' | 'article'> = {
  Books: 'book',
  Papers: 'paper',
  Articles: 'article',
}

const statusMap: Record<string, 'read' | 'reading' | 'queued'> = {
  Reading: 'reading',
  Read: 'read',
  Queued: 'queued',
}

export const Route = createFileRoute('/library')({
  component: LibraryPage,
})

function LibraryPage() {
  const [activeTypeFilter, setActiveTypeFilter] = useState('All')
  const [activeStatusFilter, setActiveStatusFilter] = useState('All')
  const [statusOpen, setStatusOpen] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [loaded, setLoaded] = useState(false)
  const { setItems } = useSearch()

  useEffect(() => {
    setLoaded(true)
  }, [])

  useEffect(() => {
    const searchItems: SearchItem[] = libraryItems.map((item) => ({
      id: item.id,
      type: item.type,
      title: item.title,
      subtitle: `${item.author} · ${item.year}`,
      description: item.note,
      url: '/library',
      tags: item.tags,
      accent: item.accent,
      scrollToId: `library-${item.id}`,
    }))
    setItems(searchItems)
  }, [setItems])

  const filtered = libraryItems.filter((item) => {
    const typeMatch = activeTypeFilter === 'All' || item.type === typeMap[activeTypeFilter]
    const statusMatch =
      activeStatusFilter === 'All' || item.status === statusMap[activeStatusFilter]
    return typeMatch && statusMatch
  })

  return (
    <main className="min-h-screen px-6 py-32">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-2 flex items-center justify-between">
            <VelocityText as="h1" intensity={0.003}>
              <TextReveal
                text="Library"
                className="font-serif text-[clamp(2rem,5vw,3.5rem)] text-fg"
              />
            </VelocityText>
            <div className="shrink-0 ml-4">
              <SearchTrigger />
            </div>
          </div>
          <p className="mb-8 flex items-center gap-2 font-serif text-base text-fg-muted">
            <BookOpen className="hidden h-4 w-4 sm:inline-block text-fg-muted" />
            Books, papers, and things that shaped how I think.
          </p>
          <blockquote className="mb-6 border-l-2 border-border pl-4 font-serif text-lg italic text-fg-subtle">
            "A reader lives a thousand lives before he dies." — George R.R. Martin
          </blockquote>
          <p className="mb-6 flex items-center gap-2 font-mono text-xs text-fg-muted">
            <BookMarked className="h-3.5 w-3.5" />
            {libraryItems.length} items
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          <div className="mb-8 flex items-center justify-between border-b border-border pb-3">
            <div className="relative flex items-center gap-1 font-mono text-sm">
              {typeFilterOptions.map((option, i) => (
                <motion.button
                  key={option}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  onClick={() => {
                    setActiveTypeFilter(option)
                    setExpandedId(null)
                  }}
                  className={`relative px-3 py-1.5 transition-colors ${
                    activeTypeFilter === option ? 'text-fg' : 'text-fg-muted hover:text-fg'
                  }`}
                >
                  {option}
                  {activeTypeFilter === option && (
                    <motion.div
                      layoutId="library-type-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-fg"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            <div className="relative hidden sm:block">
              <motion.button
                onClick={() => setStatusOpen(!statusOpen)}
                className="relative flex items-center gap-1 px-3 py-1.5 font-mono text-sm text-fg-muted transition-colors hover:text-fg"
              >
                {activeStatusFilter}
                <ChevronDown
                  className={`h-3 w-3 transition-transform duration-200 ${statusOpen ? 'rotate-180' : ''}`}
                />
              </motion.button>

              <AnimatePresence>
                {statusOpen && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-40"
                      onClick={() => setStatusOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full z-50 mt-1 border border-border bg-bg-elevated py-1 shadow-lg"
                    >
                      {statusFilterOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setActiveStatusFilter(option)
                            setExpandedId(null)
                            setStatusOpen(false)
                          }}
                          className={`block w-full px-4 py-1.5 text-left font-mono text-sm transition-colors ${
                            activeStatusFilter === option
                              ? 'text-fg'
                              : 'text-fg-muted hover:text-fg'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          <div className="flex flex-col gap-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  id={`library-${item.id}`}
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
        </motion.div>

        {filtered.length === 0 && (
          <div className="py-16 text-center font-mono text-sm text-fg-subtle">
            Nothing in this category yet.
          </div>
        )}

        <motion.div
          className="mt-12 font-mono text-[10px] text-fg-subtle"
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          // {libraryItems.length} items across {new Set(libraryItems.map((i) => i.type)).size}{' '}
          categories
        </motion.div>
      </div>
    </main>
  )
}
