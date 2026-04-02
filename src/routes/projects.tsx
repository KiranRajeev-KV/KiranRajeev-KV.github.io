import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { projects, abandonedProjects } from '../data/projects'
import { Section } from '../components/section'
import { FilterTags } from '../components/filter-tags'
import { ProjectCard } from '../components/project-card'
import { ProjectDrawer } from '../components/project-drawer'
import type { Project as ProjectType } from '../data/projects'

export const Route = createFileRoute('/projects')({
  component: ProjectsPage,
})

const categoryMap: Record<string, string[]> = {
  Systems: ['syscall-tracer', 'distributed-kv'],
  Web: ['portfolio'],
  ML: ['neural-from-scratch'],
  'Open Source': ['dotfiles'],
}

function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null)

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => categoryMap[activeFilter]?.includes(p.id))

  return (
    <main className="min-h-screen px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <Section>
          <h1 className="mb-8 font-serif text-4xl text-fg">Projects</h1>
        </Section>

        <Section delay={0.05}>
          <FilterTags active={activeFilter} onChange={setActiveFilter} />
        </Section>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {filtered.map((project, i) => (
            <Section key={project.id} delay={0.1 + i * 0.05}>
              <ProjectCard project={project} onClick={() => setSelectedProject(project)} />
            </Section>
          ))}
        </div>

        <Section delay={0.3} className="mt-24">
          <h2 className="mb-2 font-serif text-2xl text-fg">What I Did Not Finish</h2>
          <p className="mb-8 font-mono text-sm text-fg-muted">Not every project ships. These taught me the most.</p>
          <div className="space-y-4">
            {abandonedProjects.map((p) => (
              <div key={p.title} className="rounded-lg border border-border p-6">
                <h3 className="font-mono text-sm font-medium text-fg">{p.title}</h3>
                <p className="mt-1 font-serif text-sm leading-relaxed text-fg-muted">{p.description}</p>
                <div className="mt-3 flex gap-1 font-mono text-xs text-fg-subtle">
                  {p.stack.map((tech, i) => (
                    <span key={tech}>
                      {tech}
                      {i < p.stack.length - 1 && <span className="mx-1">·</span>}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <ProjectDrawer project={selectedProject} onClose={() => setSelectedProject(null)} />
    </main>
  )
}
