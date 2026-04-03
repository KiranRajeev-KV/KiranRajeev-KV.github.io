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
    categoryColor: '#3b82f6',
    teaser:
      'My first portfolio site, built from scratch in a week. Here is what I built, what I learned, and why I am not sorry about the custom cursor.',
    featured: true,
    wordCount: 1474,
  },
]
