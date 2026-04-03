import { useMemo, useState } from 'react'
import Fuse from 'fuse.js'
import type { SearchItem } from '../context/search-context'

export function useFuzzySearch(items: SearchItem[]) {
  const [query, setQuery] = useState('')

  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys: [
          { name: 'title', weight: 0.5 },
          { name: 'tags', weight: 0.3 },
          { name: 'subtitle', weight: 0.1 },
          { name: 'description', weight: 0.1 },
        ],
        threshold: 0.4,
        includeMatches: true,
        ignoreLocation: true,
        minMatchCharLength: 2,
      }),
    [items]
  )

  const results = useMemo(() => {
    if (!query.trim()) return items.slice(0, 8)
    return fuse
      .search(query)
      .slice(0, 8)
      .map((r) => ({
        item: r.item,
        matches: r.matches,
      }))
  }, [query, fuse, items])

  return { query, setQuery, results }
}
