import { motion, AnimatePresence } from 'motion/react'
import type { Project } from '../data/projects'

interface ProjectDrawerProps {
  project: Project | null
  onClose: () => void
}

export function ProjectDrawer({ project, onClose }: ProjectDrawerProps) {
  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-lg overflow-y-auto border-l border-border bg-bg-elevated p-8 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="mb-8 font-mono text-sm text-fg-muted transition-colors hover:text-fg"
            >
              ← back
            </button>

            <div
              className="mb-2 h-1 w-12 rounded-full"
              style={{ backgroundColor: project.accent }}
            />
            <h2 className="mb-4 font-serif text-3xl text-fg">{project.title}</h2>

            <div className="mb-8 flex flex-wrap gap-2 font-mono text-xs">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border px-2.5 py-1 text-fg-muted"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="space-y-6 text-fg">
              <div>
                <h3 className="mb-2 font-mono text-xs uppercase tracking-widest text-fg-subtle">
                  Overview
                </h3>
                <p className="font-serif leading-relaxed">{project.longDescription}</p>
              </div>

              <div>
                <h3 className="mb-2 font-mono text-xs uppercase tracking-widest text-fg-subtle">
                  Problem
                </h3>
                <p className="font-serif leading-relaxed">{project.problem}</p>
              </div>

              <div>
                <h3 className="mb-2 font-mono text-xs uppercase tracking-widest text-fg-subtle">
                  Solution
                </h3>
                <p className="font-serif leading-relaxed">{project.solution}</p>
              </div>

              <div>
                <h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-fg-subtle">
                  Lessons Learned
                </h3>
                <ul className="space-y-2">
                  {project.lessons.map((lesson) => (
                    <li
                      key={lesson}
                      className="flex items-start gap-2 font-serif text-sm leading-relaxed"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-fg-subtle" />
                      {lesson}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-4 pt-4">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm text-fg-muted underline decoration-border underline-offset-4 transition-colors hover:text-fg"
                  >
                    GitHub →
                  </a>
                )}
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm text-fg-muted underline decoration-border underline-offset-4 transition-colors hover:text-fg"
                  >
                    Live Demo →
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
