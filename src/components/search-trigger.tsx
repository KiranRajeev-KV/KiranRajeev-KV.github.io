import { useSearch } from '../context/search-context'
import { Search } from 'lucide-react'

export function SearchTrigger() {
  const { open } = useSearch()

  return (
    <button
      onClick={open}
      className="group flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-bg-elevated/60 backdrop-blur-sm transition-colors hover:border-fg-subtle hover:bg-bg-elevated/80"
      aria-label="Search"
    >
      <Search className="h-4 w-4 text-fg-muted transition-colors group-hover:text-fg" />
    </button>
  )
}
