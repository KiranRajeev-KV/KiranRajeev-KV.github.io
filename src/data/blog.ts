export interface BlogPost {
  slug: string
  title: string
  date: string
  category: string
  categoryColor: string
  teaser: string
  featured: boolean
  wordCount: number
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'building-this-portfolio',
    title: 'How I Built This Portfolio (And Why It Took Too Long)',
    date: '2026-04-02',
    category: 'Web',
    categoryColor: '#3b82f6',
    teaser: 'A terminal-inspired portfolio with fuzzy search, a custom cursor, and more time spent on animations than I care to admit.',
    featured: true,
    wordCount: 1036,
  },
]
