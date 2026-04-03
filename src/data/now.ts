export interface NowData {
  lastUpdated: string
  paragraphs: string[]
  currentStack: string[]
}

export const now: NowData = {
  lastUpdated: 'April 2026',
  paragraphs: [
    'I am currently building vox — a real-time voice-to-text tool with Whisper transcription and async LLM cleanup. Most of my time goes to optimizing VRAM usage on consumer GPUs and making the paste pipeline feel instant.',
    'Outside of that, I am reading Designing Data-Intensive Applications for the first time. The chapters on replication and partitioning are already changing how I think about the systems I build.',
    'On the personal side: reading more, sleeping slightly more, and slowly accepting that my Neovim config will never be finished.',
  ],
  currentStack: ['Go', 'TypeScript', 'Python', 'PostgreSQL', 'Whisper', 'Neon', 'Arch Linux'],
}
