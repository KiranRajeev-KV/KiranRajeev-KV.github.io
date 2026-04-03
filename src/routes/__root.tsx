import { Outlet, createRootRoute } from '@tanstack/react-router'
import { AnimatePresence } from 'motion/react'
import { CustomCursor } from '../components/custom-cursor'
import { FloatingNav } from '../components/floating-nav'
import { MobileNav } from '../components/mobile-nav'
import { MobileWarning } from '../components/mobile-warning'
import { ProgressBar } from '../components/progress-bar'
import { Footer } from '../components/footer'
import { ToastProvider } from '../components/toast'
import { CursorProvider } from '../context/cursor-context'
import { SearchProvider } from '../context/search-context'
import { CommandPalette } from '../components/command-palette'
import { useCommandPalette } from '../hooks/use-command-palette'

export const Route = createRootRoute({
  component: RootComponent,
})

function CommandPaletteWrapper() {
  useCommandPalette()
  return null
}

function RootComponent() {
  return (
    <>
      <ProgressBar />
      <SearchProvider>
        <CommandPaletteWrapper />
        <CommandPalette />
        <CursorProvider>
          <CustomCursor />
          <MobileWarning />
          <ToastProvider>
            <div className="min-h-screen bg-bg text-fg">
              <FloatingNav />
              <MobileNav />
              <AnimatePresence mode="wait">
                <Outlet />
              </AnimatePresence>
              <Footer />
            </div>
          </ToastProvider>
        </CursorProvider>
      </SearchProvider>
    </>
  )
}
