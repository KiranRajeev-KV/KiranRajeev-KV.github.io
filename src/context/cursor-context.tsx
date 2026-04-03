import { createContext, useContext, useState, useEffect, useCallback } from 'react'

interface CursorContextType {
  enabled: boolean
  toggle: () => void
}

const CursorContext = createContext<CursorContextType | null>(null)

export function useCursor() {
  const ctx = useContext(CursorContext)
  if (!ctx) throw new Error('useCursor must be used within CursorProvider')
  return ctx
}

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === 'undefined') return true
    const stored = sessionStorage.getItem('cursor-enabled')
    return stored === null ? true : stored === 'true'
  })

  useEffect(() => {
    sessionStorage.setItem('cursor-enabled', String(enabled))
  }, [enabled])

  const toggle = useCallback(() => {
    setEnabled((prev) => !prev)
  }, [])

  return <CursorContext.Provider value={{ enabled, toggle }}>{children}</CursorContext.Provider>
}
