import { createContext, useContext, useState, useCallback } from 'react'

export interface SearchItem {
  id: string
  type: 'project' | 'book' | 'paper' | 'article' | 'blog'
  title: string
  subtitle: string
  description: string
  url: string
  tags: string[]
  accent?: string
  scrollToId?: string
}

interface SearchContextType {
  isOpen: boolean
  open: () => void
  close: () => void
  items: SearchItem[]
  setItems: (items: SearchItem[]) => void
}

const SearchContext = createContext<SearchContextType | null>(null)

export function useSearch() {
  const ctx = useContext(SearchContext)
  if (!ctx) throw new Error('useSearch must be used within SearchProvider')
  return ctx
}

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [items, setItems] = useState<SearchItem[]>([])

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  return (
    <SearchContext.Provider value={{ isOpen, open, close, items, setItems }}>
      {children}
    </SearchContext.Provider>
  )
}
