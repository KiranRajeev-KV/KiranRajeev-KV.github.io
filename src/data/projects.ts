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
    id: 'syscall-tracer',
    title: 'Syscall Tracer',
    description: 'A lightweight Linux syscall tracer for debugging and performance analysis',
    longDescription: 'A userspace syscall tracer built with eBPF that intercepts and logs system calls with minimal overhead. Designed as a learning tool for understanding OS internals.',
    problem: 'Existing tracing tools like strace add significant overhead and produce noisy output that is hard to parse for quick debugging sessions.',
    solution: 'Built a focused tracer using eBPF kprobes that filters by process, syscall category, and latency threshold. Outputs structured JSON for easy piping into analysis tools.',
    lessons: [
      'eBPF verifier is strict but teaches you to think about kernel safety',
      'Performance profiling revealed that string formatting was the bottleneck, not the probe itself',
      'Writing good CLI ergonomics is harder than the core logic',
    ],
    stack: ['C', 'eBPF', 'Go', 'Linux'],
    accent: '#f59e0b',
    size: 'large',
    links: { github: '#' },
    featured: true,
    showcase: true,
  },
  {
    id: 'distributed-kv',
    title: 'Distributed KV Store',
    description: 'A Raft-based distributed key-value store with linearizable reads',
    longDescription: 'Implemented the Raft consensus algorithm from scratch to build a fault-tolerant key-value store. Supports leader election, log replication, and membership changes.',
    problem: 'Understanding distributed consensus is notoriously difficult from papers alone. Building it reveals edge cases no paper mentions.',
    solution: 'Built a Raft implementation in Go with a gRPC transport layer. Added a simple HTTP API for the KV interface. Tested with Jepsen-style fault injection.',
    lessons: [
      'Network partitions expose assumptions you did not know you had',
      'The Raft paper omits details that are critical for correctness',
      'Testing distributed systems requires deterministic time control',
    ],
    stack: ['Go', 'gRPC', 'Raft'],
    accent: '#10b981',
    size: 'small',
    links: { github: '#' },
    featured: true,
    showcase: true,
  },
  {
    id: 'neural-from-scratch',
    title: 'Neural Net from Scratch',
    description: 'A minimal neural network library with autograd, no dependencies',
    longDescription: 'Built a tiny neural network library in pure Python with automatic differentiation, supporting common layers (Linear, ReLU, Softmax) and optimizers (SGD, Adam).',
    problem: 'Deep learning frameworks abstract away the mechanics. Understanding backpropagation at the tensor level is essential for real debugging.',
    solution: 'Implemented a micrograd-style autograd engine with a computation graph. Built training loops for MNIST classification from scratch.',
    lessons: [
      'Numerical stability is not optional — log-sum-exp matters',
      'Vectorization speedup is real: pure Python loops are 100x slower than numpy',
      'Understanding the math makes debugging model convergence 10x faster',
    ],
    stack: ['Python', 'NumPy'],
    accent: '#8b5cf6',
    size: 'small',
    links: { github: '#' },
    featured: false,
    showcase: false,
  },
  {
    id: 'dotfiles',
    title: 'Dotfiles',
    description: 'Personal development environment configuration',
    longDescription: 'My dotfiles — Neovim config, tmux setup, shell aliases, and a bootstrap script for new machines. The kind of thing you iterate on for years.',
    problem: 'Setting up a new machine should take minutes, not hours.',
    solution: 'A single bootstrap script that installs dependencies, symlinks configs, and sets up sane defaults. Heavily documented.',
    lessons: [
      'Your editor config is a force multiplier — invest in it',
      'Shell aliases you forget about are the most valuable ones',
    ],
    stack: ['Lua', 'Bash', 'Neovim'],
    accent: '#64748b',
    size: 'small',
    links: { github: '#' },
    featured: false,
    showcase: false,
  },
  {
    id: 'portfolio',
    title: 'This Portfolio',
    description: 'The site you are looking at right now',
    longDescription: 'Built with TanStack Router, Vite, Tailwind CSS v4, and Motion. Every animation, every transition, every pixel was intentional.',
    problem: 'Most student portfolios look the same. Wanted something that feels like a technical journal, not a template.',
    solution: 'Designed from first principles — monospace meets serif, precise grid, intentional whitespace. No frameworks beyond the build tooling.',
    lessons: [
      'Design systems are harder than they look',
      'Animation timing is everything — 200ms feels snappy, 400ms feels deliberate',
    ],
    stack: ['TS', 'React', 'Tailwind', 'Motion'],
    accent: '#2563eb',
    size: 'large',
    links: { github: '#', live: '#' },
    featured: true,
    showcase: false,
  },
]

export const abandonedProjects = [
  {
    title: 'Custom Tiling WM',
    description: 'Started writing a tiling window manager in Rust for X11. Got basic window placement working but the Xlib API is a nightmare and Wayland was not ready for a solo project. Learned a ton about X11 internals though.',
    stack: ['Rust', 'Xlib'],
  },
  {
    title: 'Real-time Collaborative Editor',
    description: 'CRDTs seemed elegant on paper. The reality of handling concurrent edits with proper conflict resolution without a central server was harder than expected. Put it on ice, might revisit with Yjs.',
    stack: ['TS', 'WebSockets', 'CRDTs'],
  },
]
