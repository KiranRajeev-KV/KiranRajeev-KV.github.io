export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  problem: string
  solution: string
  lessons: string[]
  stack: string[]
  accent: string
  size: 'large' | 'small'
  preview?: string
  links: {
    github?: string
    live?: string
  }
  featured: boolean
  showcase: boolean
}

export const projects: Project[] = [
  {
    id: 'anokha-pragati',
    title: 'Anokha & Pragati',
    description:
      'Shared backend powering 6 frontend apps across 2 university tech fests, serving 6,000+ users',
    longDescription:
      'A shared Go backend powering 6 interconnected frontend applications across 2 university tech fests. Built with 16+ contributors in a PR-driven workflow. Features role-based access, bed allocation with row-level locking, async event publishing via RabbitMQ, and a complete hospitality lifecycle with QR-based gate management.',
    problem:
      'Two major university tech fests with thousands of participants needed separate but overlapping systems — registration, payments, hospitality, bed allocation, attendance, and leaderboards. Building them separately would mean duplicated effort and inconsistent data.',
    solution:
      'Built a shared Go backend serving 6 frontend apps. The hardest part was the bed allocation system — when hundreds of people compete for limited hostel beds, you need row-level locking or things go wrong fast. Added a disk-persistent email queue so nothing gets lost on restart, PayU payment integration, and RabbitMQ for async events. Put Prometheus metrics and k6 load testing in place before the fests actually started.',
    lessons: [
      'Row-level locking is essential when concurrent users compete for limited resources',
      'A disk-persistent queue survives crashes — in-memory queues lose everything on restart',
      'Building for 6,000+ users taught me that p95 latency matters more than average',
      'Open-source with 16+ contributors requires strict CI gates — fmt.Println blocks in production code',
    ],
    stack: [
      'Go',
      'Gin',
      'PostgreSQL',
      'Redis',
      'RabbitMQ',
      'PASETO',
      'Prometheus',
      'React',
      'Next.js',
      'TypeScript',
      'TanStack',
      'Tailwind',
    ],
    accent: 'oklch(0.77 0.18 85)',
    size: 'large',
    links: { github: 'https://github.com/Infinite-Sum-Games/Am.Anokha-26' },
    featured: true,
    showcase: true,
  },
  {
    id: 'paper-scout',
    title: 'Paper Scout',
    description:
      'AI-powered research paper analysis pipeline with vector search and LLM-driven gap detection',
    longDescription:
      'A research analysis pipeline in Go that takes a query, discovers relevant papers from Semantic Scholar and arXiv, ranks them using embeddings and LLM re-scoring, detects research gaps, and generates a structured report. Features real-time progress streaming, a circuit breaker across 4 external APIs, and Redis-backed state persistence.',
    problem:
      'Finding relevant research papers and identifying gaps in existing literature is tedious. Existing tools list papers but do not analyze relationships, contradictions, or unexplored directions between them.',
    solution:
      'Built a multi-stage pipeline with hybrid sync and async execution. Papers are discovered from dual sources, ranked using Gemini embeddings combined with LLM re-scoring, and analyzed by specialized LLM agents for gap detection and report generation. Added rate limiting, exponential backoff, and graceful degradation across all external APIs — because academic APIs will rate-limit you.',
    lessons: [
      'Circuit breakers are not optional when you depend on 4 external APIs — one failure cascades without them',
      'Client-side rate limiting prevents getting banned by APIs with strict quotas',
      'Vector search with cosine similarity is powerful but needs LLM re-ranking to surface truly relevant results',
      'Background goroutines with Redis-backed state persistence survive crashes mid-pipeline',
    ],
    stack: [
      'Go',
      'Gin',
      'PostgreSQL',
      'Redis',
      'Qdrant',
      'Google Gemini',
      'GROBID',
      'Docker',
      'gRPC',
      'SSE',
    ],
    accent: 'oklch(0.72 0.16 162)',
    size: 'large',
    links: { github: 'https://github.com/KiranRajeev-KV/paper-scout' },
    featured: true,
    showcase: true,
  },
  {
    id: 'vox',
    title: 'Vox',
    description: 'Real-time voice-to-text with Whisper transcription and async LLM cleanup',
    longDescription:
      'A real-time voice-to-text tool that transcribes speech using Whisper and asynchronously cleans up grammar with any OpenAI-compatible LLM. Features an optimistic paste pattern where raw text appears instantly while LLM cleanup runs in the background. Includes a Flask web UI with search, a test suite with accuracy benchmarks, and GPU-optimized memory management.',
    problem:
      'Existing voice typing tools either have high latency (waiting for LLM cleanup) or produce raw, unpolished text. There is no tool that gives you instant feedback while still delivering cleaned-up output.',
    solution:
      'Built a multi-threaded pipeline. The key insight: paste raw text instantly, then run LLM cleanup asynchronously in the background. Added silence detection for automatic trimming, model quantization for consumer GPU compatibility, and multiple output strategies. The result is sub-second transcription with polished output that arrives a moment later.',
    lessons: [
      'Optimistic UI patterns work for voice too — show raw output immediately, clean up in the background',
      'Model quantization on consumer GPUs is a trade-off between speed and accuracy',
      'Accuracy benchmarks catch quality degradation before it reaches users',
      'Direct keyboard paste is faster than clipboard but requires careful window filtering',
    ],
    stack: ['Python', 'faster-whisper', 'Flask', 'SQLite', 'OpenAI', 'FFmpeg', 'numpy', 'pytest'],
    accent: 'oklch(0.60 0.22 293)',
    size: 'large',
    links: { github: 'https://github.com/KiranRajeev-KV/vox' },
    featured: true,
    showcase: true,
  },
  {
    id: 'nyx',
    title: 'Nyx',
    description: 'Lost-and-found platform with on-device image similarity search',
    longDescription:
      'A lost-and-found platform with token-based auth and on-device image embeddings for similarity search. Generates image vectors using ONNX Runtime entirely in Go — no external ML services. Combines PostgreSQL full-text search with vector similarity for matching items by both text and image.',
    problem:
      'Lost-and-found systems rely on text descriptions, which are unreliable for visual items. A lost blue backpack described differently by two people will never match in a text-only search.',
    solution:
      'Built an on-device image embedding pipeline that generates vectors for every uploaded image, enabling similarity search directly in PostgreSQL. Combined with full-text search for hybrid matching. Implemented token-based auth, S3-compatible image storage with presigned URLs, and a comprehensive test suite.',
    lessons: [
      'Running image embeddings on-device eliminates external ML service dependencies and latency',
      'Hybrid search (full-text + vector) outperforms either approach alone for real-world queries',
      'Modern token-based auth is simpler and safer than JWT for cookie-based sessions',
      'A large test suite is not overkill — it is the minimum for a production API',
    ],
    stack: ['Go', 'Gin', 'PostgreSQL', 'pgvector', 'ONNX Runtime', 'CLIP', 'SQLC', 'PASETO', 'S3'],
    accent: 'oklch(0.72 0.14 200)',
    size: 'small',
    links: { github: 'https://github.com/KiranRajeev-KV/nyx-backend' },
    featured: true,
    showcase: true,
  },
  {
    id: 'hibiki',
    title: 'Hibiki',
    description: 'Shazam-style audio fingerprinting engine built from scratch in Go',
    longDescription:
      'A Shazam-style audio fingerprinting pipeline implementing the Wang (2003) algorithm in Go. Features a hash encoding scheme that packs spectral peaks and time deltas into a single integer. Includes a complete audio processing chain: MP3/WAV decoding, downsampling, spectrogram generation, peak detection, and alignment matching.',
    problem:
      'Understanding how Shazam works from the paper is one thing. Implementing the fingerprinting algorithm, hash encoding, and alignment matching from scratch is an entirely different challenge.',
    solution:
      'Built a 5-layer pipeline (audio → processing → fingerprint → DB → match) with clean separation of concerns. Reduced computational load by downsampling to 8kHz. Implemented hash encoding enabling fast database lookups, and alignment matching to filter random collisions.',
    lessons: [
      'Anti-aliasing filters are not optional — downsampling without them produces garbage',
      'A hash packing frequency pairs and time deltas is elegant but requires careful bit allocation',
      'Alignment matching is the key differentiator between real fingerprinting and naive hash matching',
      'Testing with hundreds of thousands of combinations does not guarantee zero collisions in production',
    ],
    stack: ['Go', 'gonum', 'SQLite', 'FFmpeg', 'FFT', 'DSP'],
    accent: 'oklch(0.65 0.23 350)',
    size: 'small',
    links: { github: 'https://github.com/KiranRajeev-KV/hibiki' },
    featured: true,
    showcase: false,
  },
  {
    id: 'memoria',
    title: 'Memoria',
    description: 'Bitcask-style key-value storage engine built in pure Go',
    longDescription:
      'A Bitcask-style key-value storage engine built from scratch in pure Go with zero external dependencies. Features an in-memory index for fast point lookups, sequential append-only writes with integrity checks, and a segment rotation system with auto-compaction. Handles 200+ concurrent goroutines safely with a multi-tier locking model.',
    problem:
      'Most KV stores are either too complex (RocksDB) or too simple (a map). Building a production-grade storage engine teaches you about disk I/O, concurrency, compaction, and crash recovery — things no framework abstracts away.',
    solution:
      'Implemented a Bitcask design with in-memory index, append-only log segments, auto-rotation at 16MB, and background merge compaction. Added hint files for fast recovery, an LRU file cache to prevent file descriptor exhaustion, and integrity checks on every entry. Tested with 200-goroutine stress tests.',
    lessons: [
      'Sequential writes are 100x faster than random writes — append-only logs exploit this',
      'Hint files are a clever optimization: replay metadata instead of scanning full segment logs',
      'Three synchronized locks is the minimum for safe concurrent reads, writes, and merges',
      'Crash recovery testing is the only way to trust your storage engine',
    ],
    stack: ['Go', 'CRC32', 'LSM-tree', 'Bitcask'],
    accent: 'oklch(0.70 0.18 55)',
    size: 'small',
    links: { github: 'https://github.com/KiranRajeev-KV/memoria' },
    featured: true,
    showcase: false,
  },
  {
    id: 'catalogus',
    title: 'Catalogus',
    description: 'Full-stack media tracking app with two-level caching',
    longDescription:
      'A full-stack media tracking application with an Express backend, SSR frontend, and a relational schema. Built a two-level caching strategy (Redis TTL + database staleness detection) reducing external API calls significantly. Includes type-safe API validation and cookie-based auth.',
    problem:
      'Tracking watched movies and TV shows across platforms is fragmented. Existing apps either lack customization or require manual entry. Wanted a self-hosted solution with fast search and reliable external API integration.',
    solution:
      'Built a full-stack app with SSR frontend and Express backend. Implemented a Prisma extension that auto-tracks completed timestamps on status transitions. Added two-level caching and debounced search with optimistic UI updates. Containerized services with Docker Compose and established API test files.',
    lessons: [
      'Prisma extensions are powerful for cross-cutting concerns like auto-tracking timestamps',
      'Two-level caching (Redis + DB staleness) is the sweet spot between performance and data freshness',
      'Zod validation at the API boundary catches bad input before it reaches the database',
      'Docker Compose with persistent volumes and isolated networking is production-ready for small stacks',
    ],
    stack: [
      'TypeScript',
      'React',
      'Express',
      'Prisma',
      'PostgreSQL',
      'Redis',
      'Zod',
      'TanStack',
      'Docker',
    ],
    accent: 'oklch(0.55 0.04 245)',
    size: 'small',
    links: { github: 'https://github.com/KiranRajeev-KV/catalogus' },
    featured: false,
    showcase: false,
  },
  {
    id: 'season-of-code',
    title: 'Season of Code',
    description:
      'Open-source competition platform with real-time leaderboards and live activity feeds',
    longDescription:
      'A full-stack open-source competition platform serving 250+ participants with real-time leaderboards, issue tracking, and GitHub OAuth. Built with a Next.js frontend and Go backend featuring a supervisor pattern for managing live feeds, SSE-based real-time updates, and sorted-set leaderboards across multiple categories.',
    problem:
      'Open-source competition platforms need real-time leaderboards, issue tracking, and live activity feeds. Building this with polling is wasteful — SSE is the right tool but requires careful client management.',
    solution:
      'Built a Next.js + Go platform with SSE real-time updates using a protected client registry and buffered channels with backpressure. Implemented a supervisor pattern with crash recovery for zero-downtime live feeds. Added sorted-set leaderboards with compact score encoding across multiple categories.',
    lessons: [
      'SSE with buffered channels and backpressure is more reliable than WebSockets for one-way broadcasts',
      'A supervisor pattern with crash recovery prevents a single failure from taking down the entire feed',
      'Sorted sets with float-score encoding is an elegant way to handle leaderboard ranking',
      'Client-side token refresh with retry prevention avoids thundering herd on 401 responses',
    ],
    stack: [
      'Go',
      'Gin',
      'PostgreSQL',
      'Redis',
      'JWT',
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind',
      'Docker',
    ],
    accent: 'oklch(0.75 0.18 120)',
    size: 'small',
    links: { github: 'https://github.com/Infinite-Sum-Games/platform.soc' },
    featured: false,
    showcase: false,
  },
  {
    id: 'devstats-pipeline',
    title: 'DevStats Pipeline',
    description: 'Zero-dependency Go CLI for concurrent CSV data processing',
    longDescription:
      'A Go CLI application using only the standard library to parse, transform, and aggregate Stack Overflow developer survey data. Implements a producer-worker-consumer pattern with broadcast distribution, orchestrating multiple goroutine types connected via buffered channels. Features an extensible metric architecture where new metrics require just 2 functions.',
    problem:
      'Processing large CSV survey datasets sequentially is slow. The standard library has all the tools for concurrent processing, but most developers reach for external libraries instead.',
    solution:
      'Built a concurrent pipeline with worker goroutines for CSV row parsing, decoupling I/O-bound reading from CPU-bound processing. Implemented bounded buffered channels for backpressure between pipeline stages and a broadcast distributor fanning out processed rows to independent metric channels.',
    lessons: [
      'The standard library is enough — encoding/csv, sync, maps, and channels handle complex pipelines',
      'Bounded buffered channels provide backpressure that prevents goroutine memory blowup',
      'An extractor-reducer architecture means adding a new metric requires exactly 2 functions',
      'Broadcast distribution is the right pattern when multiple independent consumers need the same data',
    ],
    stack: ['Go', 'CSV', 'goroutines', 'channels', 'sync'],
    accent: 'oklch(0.76 0.14 225)',
    size: 'small',
    links: { github: 'https://github.com/KiranRajeev-KV/devstats-pipeline' },
    featured: false,
    showcase: false,
  },
  {
    id: 'portfolio',
    title: 'This Portfolio',
    description: 'The site you are looking at right now',
    longDescription:
      'Built with TanStack Router, Vite, Tailwind CSS v4, and Motion. Every animation, every transition, every pixel was intentional. Features a command palette with fuzzy search, kinetic text, responsive nav, and a library catalog.',
    problem:
      'Most student portfolios look the same. Wanted something that feels like a technical journal, not a template.',
    solution:
      'Designed from first principles — monospace meets serif, precise grid, intentional whitespace. No frameworks beyond the build tooling. Dark-only theme with fuzzy search and per-page search behavior.',
    lessons: [
      'Design systems are harder than they look',
      'Animation timing is everything — 200ms feels snappy, 400ms feels deliberate',
      'Building your own portfolio is the best way to learn frontend architecture',
    ],
    stack: ['TS', 'React', 'Tailwind', 'Motion', 'TanStack Router', 'MDX'],
    accent: 'oklch(0.53 0.24 260)',
    size: 'large',
    links: { github: 'https://github.com/KiranRajeev-KV/portfolio', live: '#' },
    featured: true,
    showcase: false,
  },
]

export const abandonedProjects = [
  {
    title: 'Chronos',
    description:
      'A self-hostable timetable app built as a team project. I handled the React Native Expo frontend. The project stalled as the team lost interest and scope creep set in. My first steps into React Native — learned the ecosystem and what happens when a project outgrows its original vision.',
    stack: ['React Native', 'Expo', 'Hono', 'Drizzle'],
  },
]
