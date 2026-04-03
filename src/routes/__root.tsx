import { Outlet, createRootRoute, Link, useRouter } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { FloatingNav } from '../components/floating-nav'
import { MobileNav } from '../components/mobile-nav'
import { MobileWarning } from '../components/mobile-warning'
import { ProgressBar } from '../components/progress-bar'
import { Footer } from '../components/footer'
import { TextScramble } from '../components/text-scramble'
import { ToastProvider } from '../components/toast'
import { SearchProvider } from '../context/search-context'
import { CommandPalette } from '../components/command-palette'
import { useCommandPalette } from '../hooks/use-command-palette'

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundPage,
})

function NotFoundPage() {
  const [showLink, setShowLink] = useState(false)

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-6 font-mono text-6xl font-bold text-fg">404</div>
          <div className="space-y-1 font-mono text-sm text-fg-muted">
            <p>$ cd /page-you-wanted</p>
            <TextScramble
              text="bash: no such file or directory"
              speed={30}
              onComplete={() => setShowLink(true)}
            />
          </div>
          <AnimatePresence>
            {showLink && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 font-mono text-sm text-fg-muted underline decoration-border underline-offset-4 transition-colors hover:text-fg"
                >
                  <span>←</span>
                  <span>back home</span>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  )
}

function CommandPaletteWrapper() {
  useCommandPalette()
  return null
}

function RootComponent() {
  const router = useRouter()

  useEffect(() => {
    const redirect = sessionStorage.getItem('redirect')
    if (redirect) {
      sessionStorage.removeItem('redirect')
      window.history.replaceState(null, '', redirect)
    }
  }, [])

  return (
    <>
      <ProgressBar />
      <SearchProvider>
        <CommandPaletteWrapper />
        <MobileWarning />
        <ToastProvider>
          <CommandPalette />
          <div className="min-h-screen bg-bg text-fg">
            <FloatingNav />
            <MobileNav />
            <AnimatePresence mode="wait">
              <motion.div
                key={router.state.location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
            <Footer />
          </div>
        </ToastProvider>
      </SearchProvider>
    </>
  )
}
