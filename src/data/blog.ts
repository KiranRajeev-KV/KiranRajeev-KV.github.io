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
      'My first portfolio site, built from scratch in a week. Here is what I built, what I learned, and why I shipped it.',
    featured: true,
    wordCount: 1474,
  },
  {
    slug: 'the-psychology-of-code',
    title: 'The Psychology of Code: Why We Write Code the Way We Do',
    date: '2026-03-15',
    category: 'Programming',
    categoryColor: '#ef4444',
    teaser:
      'Exploring the psychological factors that influence how we write code, from cognitive biases to design patterns.',
    featured: false,
    wordCount: 2310,
  },
]
