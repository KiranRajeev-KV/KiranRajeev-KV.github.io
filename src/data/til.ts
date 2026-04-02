export interface TilPost {
  id: string
  date: string
  content: string
  tag: string
}

export const tilPosts: TilPost[] = [
  {
    id: '1',
    date: '2025-03-20',
    content: 'You can use `git log --follow -- <file>` to track renames. Spent way too long without knowing this.',
    tag: 'git',
  },
  {
    id: '2',
    date: '2025-03-18',
    content: 'CSS `text-wrap: balance` is a real thing and it makes headings look 10x better with zero effort. Supported in all modern browsers.',
    tag: 'css',
  },
  {
    id: '3',
    date: '2025-03-15',
    content: 'PostgreSQL `EXPLAIN (ANALYZE, BUFFERS)` shows buffer hits/misses, not just timing. Way more useful for understanding query performance than just `EXPLAIN ANALYZE`.',
    tag: 'postgres',
  },
  {
    id: '4',
    date: '2025-03-10',
    content: 'Go `defer` runs in LIFO order. If you defer multiple cleanup calls, the last one registered runs first. Makes sense for resource cleanup (close file before removing temp dir) but easy to forget.',
    tag: 'go',
  },
  {
    id: '5',
    date: '2025-03-05',
    content: 'The Linux `perf` tool can sample at the function level with `perf record -g`. Combined with `perf report`, it gives you a full call graph of where CPU time goes.',
    tag: 'linux',
  },
  {
    id: '6',
    date: '2025-02-28',
    content: 'TypeScript `satisfies` operator is better than type assertions in almost every case. It validates the type without widening.',
    tag: 'typescript',
  },
]
