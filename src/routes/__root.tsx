import { Outlet, createRootRoute, ScrollRestoration } from '@tanstack/react-router'
import { AnimatePresence } from 'motion/react'
import { CustomCursor } from '../components/custom-cursor'
import { FloatingNav } from '../components/floating-nav'
import { MobileNav } from '../components/mobile-nav'
import { ProgressBar } from '../components/progress-bar'
import { Footer } from '../components/footer'
import { ToastProvider } from '../components/toast'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <ScrollRestoration />
      <ProgressBar />
      <CustomCursor />
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
    </>
  )
}
