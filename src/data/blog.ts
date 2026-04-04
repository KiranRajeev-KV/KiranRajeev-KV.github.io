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
    title: 'Building This Portfolio',
    date: '2026-04-02',
    category: 'Web',
    categoryColor: 'oklch(0.57 0.24 260)',
    teaser:
      'What happens when you finally run out of excuses. Built from scratch in a week, dark-only, terminal-meets-editorial.',
    featured: true,
    wordCount: 713,
  },
]
