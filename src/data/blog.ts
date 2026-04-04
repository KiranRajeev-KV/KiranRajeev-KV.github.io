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
    title: 'How I Built This Portfolio (And Why It Took a Week)',
    date: '2026-04-02',
    category: 'Web',
    categoryColor: 'oklch(0.57 0.24 260)',
    teaser:
      'My first portfolio site, built from scratch in a week. Here is what I built, what I learned, and why I shipped it.',
    featured: true,
    wordCount: 1474,
  },
]
