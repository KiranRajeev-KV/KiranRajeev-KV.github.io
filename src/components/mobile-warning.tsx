import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { TerminalPrompt } from './terminal-prompt'

export function MobileWarning() {
  const [show, setShow] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [width, setWidth] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.innerWidth >= 768) return
    if (sessionStorage.getItem('mobile-warning-dismissed')) return

    setShow(true)
    setWidth(window.innerWidth)
  }, [])

  if (!show || dismissed) return null

  const handleDismiss = () => {
    setDismissed(true)
    sessionStorage.setItem('mobile-warning-dismissed', 'true')
  }

  const terminalLines = [
    { text: 'viewport_warning: detected', prompt: false, delay: 0 },
    { text: '', prompt: false, delay: 400 },
    {
      text: 'This portfolio was designed and built for a wider screen.',
      prompt: false,
      delay: 600,
    },
    { text: 'Mobile works, but you are missing the good stuff.', prompt: false, delay: 800 },
    { text: '', prompt: false, delay: 1000 },
    { text: `best viewed on: desktop or laptop`, prompt: false, delay: 1200 },
    { text: `your screen:      phone (${width}px)`, prompt: false, delay: 1400 },
  ]

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

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="relative rounded-lg border border-border p-6"
          >
            <div className="mb-2 font-mono text-xs text-accent">⚠</div>
            <TerminalPrompt
              lines={terminalLines}
              typingSpeed={25}
              lineDelay={100}
              onComplete={() => setDone(true)}
            />

            <AnimatePresence>
              {done && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-6"
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
