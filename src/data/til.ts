export interface TilPost {
  id: string
  date: string
  content: string
  tag: string
}

export const tilPosts: TilPost[] = [
  {
    id: '1',
    date: '2026-04-02',
    content:
      'Go `defer` evaluates its arguments at the time of the defer statement, not when the deferred function actually runs. So `defer fmt.Println(err)` captures the current value of `err` — which is usually `nil` at that point. If you need the updated value after the function returns, use named return values or wrap it in a closure: `defer func() { fmt.Println(err) }()`.',
    tag: 'go',
  },
  {
    id: '2',
    date: '2026-03-28',
    content:
      'A semaphore is not a mutex with extra features — it is a fundamentally different abstraction. A mutex is about ownership: the thread that locks must unlock. A semaphore is about counting: any thread can signal, any thread can wait. Use a mutex to protect a critical section. Use a semaphore to limit concurrency — like a connection pool with a max of N simultaneous connections. Go does not have a built-in semaphore, but `make(chan struct{}, N)` works as one.',
    tag: 'concurrency',
  },
  {
    id: '3',
    date: '2026-03-22',
    content:
      'The October 2025 AWS us-east-1 outage took down half the internet for 14 hours. The root cause was a single internal DNS entry that stopped resolving during an automated scaling operation. The cascading failure happened because services retried aggressively, overloading the DNS infrastructure further. The lesson: when your dependency fails, exponential backoff is not optional — it is survival.',
    tag: 'distributed-systems',
  },
  {
    id: '4',
    date: '2026-03-15',
    content:
      'Most of Python\'s performance-critical libraries are not written in Python at all. NumPy is C. PyTorch is C++. TensorFlow is C++. Even the standard library\'s `json` module has a C accelerator. Python is the interface layer — the glue that holds together decades of optimized C and C++ code. When someone says "Python is slow," they are right. But the code they are using is probably not Python.',
    tag: 'ml',
  },
  {
    id: '5',
    date: '2026-03-08',
    content:
      'PostgreSQL JSONB stores JSON in a decomposed binary format, not as text. This means you can index it with GIN indexes, query nested fields with `->` and `->>` operators, and even enforce constraints on JSON structure. The `jsonb_path_ops` operator class is smaller and faster for containment queries (`@>`), while the default `jsonb_ops` supports more operators but uses more disk space. Use JSONB when your schema is fluid but your queries are predictable.',
    tag: 'databases',
  },
]
