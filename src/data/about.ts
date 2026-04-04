interface Skill {
  name: string
  weight: number
  note: string
}

interface TimelineItem {
  year: string
  title: string
  note: string
}

interface AboutData {
  name: string
  pronouns: string
  location: string
  university: string
  major: string
  graduation: string
  currentlyBuilding: string
  currentlyReading: string
  bio: string
  skills: Record<string, Skill[]>
  timeline: TimelineItem[]
}

export const about: AboutData = {
  name: 'Kiran Rajeev',
  pronouns: 'he/him',
  location: 'TBA',
  university: 'Amrita Vishwa Vidyapeetham, Coimbatore',
  major: 'B.Tech Computer Science and Engineering',
  graduation: 'Expected August 2027',
  currentlyBuilding:
    'vox — a real-time voice-to-text tool with Whisper transcription and async LLM cleanup',
  currentlyReading: 'Designing Data-Intensive Applications by Martin Kleppmann (first time)',
  bio: `I build things because problems bother me, and building is how I stop being bothered. It started as scratch-your-own-itch pragmatism. It's become something more like craft.

I'm finishing my B.Tech in Computer Science at Amrita Vishwa Vidyapeetham, but most of what I actually know came from outside the classroom — from staying up too late, from reinventing wheels on purpose, from building things that actually had to work.

My learning process hasn't changed much: skim first to decide if something's worth pursuing, then disappear completely. I write Go, read research papers, and build full-stack apps when I want something people can see. I care about things working correctly and feeling intentional — not as a philosophy, just as a standard.

I want to work with people who are ahead of me. Not despite my confidence — because of it. That's the fastest way to grow, and I'm not interested in slow.

Outside of code: books across too many genres, dramas with plots that actually go somewhere, and coffee that's slowly replaced most other hobbies. I'm an introvert who won't shut up once I'm comfortable.`,
  skills: {
    Languages: [
      { name: 'Go', weight: 3, note: 'Daily driver' },
      { name: 'TypeScript', weight: 3, note: 'Prefer over JS' },
      { name: 'JavaScript', weight: 3, note: 'When TS is overkill' },
      { name: 'Python', weight: 3, note: 'ML tooling' },
      { name: 'C++', weight: 3, note: 'DSA' },
      { name: 'SQL', weight: 3, note: 'Raw queries, no ORM' },
      { name: 'Bash', weight: 3, note: 'Scripting and dotfiles' },
    ],
    Frontend: [
      { name: 'React', weight: 3, note: 'Production apps' },
      { name: 'Next.js', weight: 3, note: 'SSR, App Router' },
      { name: 'TanStack', weight: 3, note: 'Router, Query, Start' },
      { name: 'Tailwind CSS', weight: 3, note: 'This portfolio included' },
      { name: 'Zustand', weight: 3, note: 'State management default' },
    ],
    Backend: [
      { name: 'Gin', weight: 3, note: 'Go backend default' },
      { name: 'Express.js', weight: 3, note: 'Node backends' },
      { name: 'Flask', weight: 3, note: 'Vox web UI' },
      { name: 'Prisma', weight: 3, note: 'ORM when needed' },
    ],
    Data: [
      { name: 'PostgreSQL', weight: 3, note: 'pgvector, GIN indexes' },
      { name: 'MySQL', weight: 3, note: 'Relational workhorse' },
      { name: 'SQLite', weight: 3, note: 'Lightweight apps' },
      { name: 'Redis', weight: 3, note: 'Caching, streams' },
      { name: 'Qdrant', weight: 3, note: 'Vector search' },
      { name: 'Neon', weight: 3, note: 'Serverless Postgres' },
      { name: 'Supabase', weight: 3, note: 'Quick backends' },
    ],
    Infra: [
      { name: 'Docker', weight: 3, note: 'Compose for everything' },
      { name: 'Git', weight: 3, note: 'PR-driven workflow' },
      { name: 'Linux', weight: 3, note: 'Arch btw' },
      { name: 'AWS', weight: 3, note: 'Cloud infrastructure' },
      { name: 'GCP', weight: 3, note: 'Cloud infrastructure' },
      { name: 'Bruno', weight: 3, note: 'API testing' },
      { name: 'Prometheus + Grafana', weight: 3, note: 'Anokha observability' },
    ],
    AI: [
      { name: 'Gemini API', weight: 3, note: 'LLM pipelines' },
      { name: 'OpenRouter', weight: 3, note: 'Multi-provider LLM routing' },
      { name: 'Ollama', weight: 3, note: 'Local LLM inference' },
      { name: 'ONNX Runtime', weight: 3, note: 'On-device embeddings' },
    ],
  },
  timeline: [],
}
