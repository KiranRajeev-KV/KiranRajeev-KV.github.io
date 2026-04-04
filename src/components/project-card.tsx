import { motion } from 'motion/react'
import type { Project } from '../data/projects'

interface ProjectCardProps {
  project: Project
  onClick: () => void
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <motion.button
      layout
      onClick={onClick}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`group relative w-full rounded-lg border border-border p-6 text-left transition-shadow hover:shadow-lg cursor-pointer`}
      style={{ '--accent': project.accent } as React.CSSProperties}
    >
      <div className="absolute inset-0 rounded-lg bg-[var(--accent)] opacity-0 transition-opacity group-hover:opacity-[0.03]" />
      <div className="relative">
        <div className="mb-3 h-0.5 w-8 bg-[var(--accent)] transition-all group-hover:w-12" />
        <h3 className="font-serif text-xl text-fg">{project.title}</h3>
        <p className="mt-1 text-sm text-fg-muted">{project.description}</p>
      </div>
    </motion.button>
  )
}
