import { Link, useLocation } from '@tanstack/react-router'
import { motion } from 'motion/react'

const navItems = [
  { path: '/', label: 'home' },
  { path: '/about', label: 'about' },
  { path: '/projects', label: 'projects' },
  { path: '/blog', label: 'blog' },
  { path: '/library', label: 'library' },
]

export function MobileNav() {
  const location = useLocation()

  return (
    <motion.nav
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-bg-elevated/90 backdrop-blur-md md:hidden"
    >
      <div className="flex items-stretch px-2 pb-[env(safe-area-inset-bottom)]">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex flex-1 flex-col items-center justify-center py-3 font-mono text-xs transition-all duration-200 ${
                isActive ? 'text-fg' : 'text-fg-subtle active:text-fg active:scale-[1.05]'
              }`}
            >
              {item.label}
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-indicator"
                  className="absolute top-0 left-1/2 h-0.5 w-6 -translate-x-1/2 bg-accent"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </Link>
          )
        })}
      </div>
    </motion.nav>
  )
}
