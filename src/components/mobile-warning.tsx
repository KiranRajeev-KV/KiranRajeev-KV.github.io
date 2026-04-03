import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const lines = [
  { text: '⚠  viewport_warning: detected', delay: 0 },
  { text: '', delay: 200 },
  { text: 'This portfolio was designed and', delay: 400 },
  { text: 'built for a wider screen. Mobile', delay: 550 },
  { text: "works, but you're missing the", delay: 700 },
  { text: 'good stuff — custom cursor,', delay: 850 },
  { text: 'hover animations, precise layout.', delay: 1000 },
  { text: '', delay: 1150 },
  { text: 'best viewed on: desktop or laptop', delay: 1300 },
  { text: 'your screen:      phone ({width}px)', delay: 1450 },
]

export function MobileWarning() {
  const [show, setShow] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [visibleLines, setVisibleLines] = useState(0)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.innerWidth >= 768) return
    if (sessionStorage.getItem('mobile-warning-dismissed')) return

    setShow(true)
    setWidth(window.innerWidth)

    lines.forEach((line, i) => {
      setTimeout(() => setVisibleLines(i + 1), line.delay)
    })
  }, [])

  if (!show || dismissed) return null

  const handleDismiss = () => {
    setDismissed(true)
    sessionStorage.setItem('mobile-warning-dismissed', 'true')
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-bg px-4"
      >
        <div className="relative w-full max-w-md">
          {/* Ambient grid background */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.03]">
            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="warning-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#warning-grid)" />
            </svg>
          </div>

          {/* Terminal box */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="relative rounded-lg border border-border p-6"
          >
            <div className="font-mono text-sm leading-relaxed">
              {lines.slice(0, visibleLines).map((line, i) => {
                const isWidthLine = line.text.includes('{width}')
                const displayText = isWidthLine
                  ? line.text.replace('{width}', String(width))
                  : line.text

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`min-h-[1.25rem] ${
                      i === 0
                        ? 'text-accent'
                        : displayText === ''
                          ? 'h-3'
                          : i >= 8
                            ? 'text-fg-subtle'
                            : 'text-fg-muted'
                    }`}
                  >
                    {displayText}
                  </motion.div>
                )
              })}

              {/* Blinking cursor on last line */}
              {visibleLines >= lines.length && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
                  className="inline-block h-4 w-2 bg-fg"
                />
              )}
            </div>

            {/* Dismiss button */}
            <AnimatePresence>
              {visibleLines >= lines.length && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-8"
                >
                  <button
                    onClick={handleDismiss}
                    className="w-full rounded border border-border px-4 py-3 font-mono text-xs text-fg-muted transition-colors hover:border-fg-subtle hover:text-fg active:bg-bg-subtle"
                  >
                    {'> '}yes, I accept suboptimal rendering
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
