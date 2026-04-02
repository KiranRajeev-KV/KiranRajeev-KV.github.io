export interface BlogPost {
  slug: string
  title: string
  date: string
  readTime: string
  category: string
  categoryColor: string
  teaser: string
  featured: boolean
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'why-i-stopped-using-orms',
    title: 'Why I Stopped Using ORMs (Mostly)',
    date: '2025-03-15',
    readTime: '6 min',
    category: 'Systems',
    categoryColor: '#f59e0b',
    teaser: 'After three years of reaching for Prisma and Drizzle by default, I have been writing raw SQL more often. Here is what changed my mind.',
    featured: true,
  },
  {
    slug: 'ebpf-is-not-scary',
    title: 'eBPF Is Not Scary',
    date: '2025-02-28',
    readTime: '8 min',
    category: 'Systems',
    categoryColor: '#f59e0b',
    teaser: 'A gentle introduction to eBPF through building a simple syscall tracer. No kernel module compilation required.',
    featured: false,
  },
  {
    slug: 'raft-is-harder-than-it-looks',
    title: 'Raft Is Harder Than It Looks',
    date: '2025-02-10',
    readTime: '10 min',
    category: 'Systems',
    categoryColor: '#f59e0b',
    teaser: 'Implementing Raft consensus from the paper took me 3 weeks. The paper took 2 days to read. The gap between those numbers is where the learning happened.',
    featured: false,
  },
  {
    slug: 'designing-with-constraints',
    title: 'Designing With Constraints',
    date: '2025-01-20',
    readTime: '4 min',
    category: 'Web',
    categoryColor: '#3b82f6',
    teaser: 'Good design is not about having more options. It is about choosing the right constraints and working within them.',
    featured: false,
  },
  {
    slug: 'learning-in-public-is-broken',
    title: 'Learning in Public Is Broken (And That Is Fine)',
    date: '2025-01-05',
    readTime: '3 min',
    category: 'Opinion',
    categoryColor: '#ef4444',
    teaser: 'The pressure to constantly ship public learning content is counterproductive. Here is why I switched to writing for myself first.',
    featured: false,
  },
]
