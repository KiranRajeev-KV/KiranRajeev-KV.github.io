import { Link, useLocation } from '@tanstack/react-router'
import { motion } from 'motion/react'

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
  { path: '/blog', label: 'Blog' },
  { path: '/library', label: 'Library' },
  { path: '/til', label: 'TIL' },
]

export function FloatingNav() {
  const location = useLocation()

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="fixed top-4 left-1/2 z-40 -translate-x-1/2 rounded-full border border-border/60 bg-bg-elevated/80 px-2 py-1.5 backdrop-blur-md hidden md:block"
    >
      <ul className="flex items-center gap-1">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`relative block rounded-full px-3 py-1.5 text-sm font-mono transition-colors ${
                location.pathname === item.path
                  ? 'text-fg'
                  : 'text-fg-muted hover:text-fg'
              }`}
            >
              {item.label}
              {location.pathname === item.path && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 rounded-full bg-bg-subtle"
                  style={{ zIndex: -1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </motion.nav>
  )
}
