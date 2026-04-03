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
    content: 'Go `defer` evaluates arguments at the time of the defer statement, not at execution. So `defer fmt.Println(err)` captures the current value of `err`, not the value after the function returns. Use named return values or a closure if you need the updated value.',
    tag: 'go',
  },
  {
    id: '2',
    date: '2026-03-28',
    content: 'PostgreSQL GIN indexes are dramatically faster than B-tree for full-text search on JSONB columns, but they are 3-5x larger on disk. Use GIN for search-heavy columns, B-tree for everything else. The `jsonb_path_ops` operator class is smaller and faster for containment queries.',
    tag: 'postgres',
  },
  {
    id: '3',
    date: '2026-03-22',
    content: 'SSE (Server-Sent Events) is simpler and more reliable than WebSockets for one-way server-to-client streaming. Automatic reconnection, built-in event types, and works over plain HTTP/2. WebSockets are only necessary when you need bidirectional communication.',
    tag: 'web',
  },
  {
    id: '4',
    date: '2026-03-15',
    content: 'Whisper large-v3 in int8 quantization uses ~2.5GB VRAM vs ~10GB in fp16, with less than 1% WER degradation on clean audio. The trade-off is worth it on consumer GPUs — just don\'t use int8 for noisy or accented speech where every bit of accuracy matters.',
    tag: 'ml',
  },
  {
    id: '5',
    date: '2026-03-08',
    content: 'Redis pipelining batches commands into a single round-trip, but it is not atomic. If you need atomicity, use Lua scripts instead. Pipelining is for throughput, Lua is for correctness. They solve different problems.',
    tag: 'redis',
  },
]
