import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useNavigate } from '@tanstack/react-router'
import { useSearch, type SearchItem } from '../context/search-context'
import { useFuzzySearch } from '../hooks/use-fuzzy-search'
import { Search, Code2, BookOpen, FileText, Newspaper, PenLine } from 'lucide-react'
import { useToast } from './toast'

const typeIcons: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  project: Code2,
  book: BookOpen,
  paper: FileText,
  article: Newspaper,
  blog: PenLine,
}

const typeLabels: Record<string, string> = {
  project: 'project',
  book: 'book',
  paper: 'paper',
  article: 'article',
  blog: 'writing',
}

function HighlightedText({
  text,
  matches,
  className,
}: {
  text: string
  matches?: any[]
  className?: string
}) {
  if (!matches || matches.length === 0) {
    return <span className={className}>{text}</span>
  }

  const allIndices = new Set<number>()
  matches.forEach((m) => {
    if (m.indices) {
      m.indices.forEach(([start, end]: [number, number]) => {
        for (let i = start; i <= end; i++) allIndices.add(i)
      })
    }
  })

  const chars = text.split('')
  return (
    <span className={className}>
      {chars.map((char, i) => (
        <span
          key={i}
          className={
            allIndices.has(i) ? 'text-accent underline decoration-accent/40 underline-offset-2' : ''
          }
        >
          {char}
        </span>
      ))}
    </span>
  )
}

export function CommandPalette() {
  const { isOpen, close, items } = useSearch()
  const { query, setQuery, results } = useFuzzySearch(items)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const { showToast } = useToast()

  const resultItems = Array.isArray(results)
    ? results.map((r: any) => ('item' in r ? r.item : r)).filter(Boolean)
    : []

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
      setQuery('')
      setSelectedIndex(0)
    }
  }, [isOpen])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  const handleSelect = useCallback(
    (item: SearchItem) => {
      close()
      if (item.type === 'project') {
        navigate({ to: '/projects', search: { open: item.id } })
      } else if (item.type === 'blog') {
        navigate({ to: item.url })
      } else if (item.scrollToId) {
        navigate({ to: item.url }).then(() => {
          setTimeout(() => {
            const el = document.getElementById(item.scrollToId!)
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }
          }, 100)
        })
      } else {
        navigate({ to: item.url })
      }
    },
    [close, navigate]
  )

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((i) => Math.min(i + 1, resultItems.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (query.startsWith('/')) {
        handleCommand(query.slice(1))
      } else if (resultItems[selectedIndex]) {
        handleSelect(resultItems[selectedIndex])
      }
    }
  }

  const handleCommand = (cmd: string) => {
    const commands: Record<string, string> = {
      coffee: '☕ powered by too much coffee',
      help: 'try /coffee or /exit',
      exit: '',
    }

    if (cmd === 'exit') {
      close()
      return
    }

    const msg = commands[cmd]
    if (msg) {
      showToast(msg)
      close()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed top-1/2 left-1/2 z-[91] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-bg-elevated shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-border px-5 py-4">
              <Search className="h-5 w-5 shrink-0 text-fg-subtle" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search..."
                className="w-full bg-transparent font-mono text-base text-fg placeholder:text-fg-subtle outline-none"
                aria-label="Search"
              />
              <kbd className="hidden rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-fg-subtle sm:block">
                esc
              </kbd>
            </div>

            <div className="max-h-96 overflow-y-auto p-2">
              {resultItems.length === 0 ? (
                <div className="flex items-center gap-2 px-3 py-8 font-mono text-sm text-fg-subtle">
                  <span className="text-accent">{'> '}</span>
                  <span>no matches found</span>
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
                    className="ml-1 inline-block h-4 w-2 bg-fg-subtle"
                  />
                </div>
              ) : (
                resultItems.map((item: SearchItem, i: number) => {
                  const isSelected = i === selectedIndex
                  const resultMatch =
                    Array.isArray(results) && results[i]
                      ? 'matches' in results[i]
                        ? results[i].matches
                        : undefined
                      : undefined
                  const Icon = typeIcons[item.type]

                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.02 }}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(i)}
                      className={`flex w-full items-center justify-between rounded-md px-4 py-3 text-left transition-colors ${
                        isSelected ? 'bg-bg-subtle' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded border text-fg-subtle"
                          style={{
                            borderColor: item.accent ? `${item.accent}40` : undefined,
                            backgroundColor: item.accent ? `${item.accent}10` : undefined,
                          }}
                        >
                          <Icon className="h-4 w-4" style={{ color: item.accent }} />
                        </span>
                        <div>
                          <div className="font-mono text-sm text-fg">
                            <HighlightedText
                              text={item.title}
                              matches={resultMatch?.filter((m: any) => m.key === 'title')}
                            />
                          </div>
                          <div className="mt-0.5 font-mono text-[10px] text-fg-subtle">
                            {item.subtitle}
                          </div>
                        </div>
                      </div>
                      <span className="shrink-0 font-mono text-[10px] text-fg-subtle">
                        {typeLabels[item.type]}
                      </span>
                    </motion.button>
                  )
                })
              )}
            </div>

            <div className="flex items-center justify-between border-t border-border px-5 py-2.5 font-mono text-[10px] text-fg-subtle">
              <div className="flex items-center gap-3">
                <span>
                  <kbd className="rounded border border-border px-1">↵</kbd> select
                </span>
                <span>
                  <kbd className="rounded border border-border px-1">↑↓</kbd> navigate
                </span>
              </div>
              <span>
                <kbd className="rounded border border-border px-1">esc</kbd> close
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
