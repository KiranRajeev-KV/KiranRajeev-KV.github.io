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
  skills: {
    languages: Skill[]
    frameworks: Skill[]
    tools: Skill[]
  }
  timeline: TimelineItem[]
}

export const about: AboutData = {
  name: 'Alex Chen',
  pronouns: 'he/him',
  location: 'Pittsburgh, PA',
  university: 'Carnegie Mellon University',
  major: 'B.S. Computer Science',
  graduation: 'Expected May 2026',
  currentlyBuilding: 'A distributed KV store with Raft consensus and a better Neovim config than I need',
  currentlyReading: 'Designing Data-Intensive Applications by Martin Kleppmann (second time, it hits different)',
  bio: `I am a systems-leaning software engineer who likes building things that work well and look good doing it.

Most of my time goes to distributed systems, low-level tooling, and the occasional web project when I want to make something people can actually see. I care about craft — not in a precious way, but in a "this should work correctly and feel intentional" way.

I have interned at a couple of places, contributed to some open source projects, and spent an embarrassing amount of time on my terminal setup. I write about what I learn because teaching is the best way to find out what you do not actually understand.

When I am not at a computer, I am probably running, reading, or explaining to someone why their regex is wrong.`,
  skills: {
    languages: [
      { name: 'TypeScript', weight: 5, note: '3 years — daily driver' },
      { name: 'Go', weight: 4, note: '2 years — systems work' },
      { name: 'Python', weight: 4, note: '4 years — ML and scripting' },
      { name: 'C', weight: 3, note: '2 years — systems classes' },
      { name: 'Rust', weight: 2, note: '1 year — still learning' },
      { name: 'Lua', weight: 2, note: 'Neovim config only' },
      { name: 'SQL', weight: 3, note: 'daily, no ORM' },
    ],
    frameworks: [
      { name: 'React', weight: 4, note: '3 years — comfortable' },
      { name: 'Next.js', weight: 3, note: '2 years — used it for projects' },
      { name: 'TanStack', weight: 3, note: 'recent convert' },
    ],
    tools: [
      { name: 'PostgreSQL', weight: 3, note: 'daily driver DB' },
      { name: 'Docker', weight: 3, note: 'containerize everything' },
      { name: 'Linux', weight: 5, note: 'Arch btw' },
      { name: 'Git', weight: 5, note: 'muscle memory' },
      { name: 'Neovim', weight: 4, note: 'no IDE since 2023' },
      { name: 'eBPF', weight: 2, note: 'used it once, survived' },
      { name: 'gRPC', weight: 2, note: 'built a couple services' },
    ],
  },
  timeline: [
    {
      year: 'Summer 2025',
      title: 'SWE Intern — Cloudflare',
      note: 'Working on the edge runtime team. Building tooling for Workers.',
    },
    {
      year: 'Fall 2024',
      title: 'Distributed Systems TA — CMU 15-440',
      note: 'Taught 120 students. Graded Go projects. Learned more from their bugs than my own.',
    },
    {
      year: 'Summer 2024',
      title: 'SWE Intern — Jane Street',
      note: 'Built internal tooling in OCaml. First time using a functional language in production.',
    },
    {
      year: 'Spring 2024',
      title: 'Open Source — Contributed to Neovim LSP',
      note: 'Fixed a bug in the built-in LSP client. 12-line PR, took 3 weeks to get right.',
    },
  ],
}
