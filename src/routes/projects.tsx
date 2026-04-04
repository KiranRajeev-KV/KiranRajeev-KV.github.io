import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { projects, abandonedProjects } from '../data/projects'
import { Section } from '../components/section'
import { ProjectCard } from '../components/project-card'
import { ProjectDrawer } from '../components/project-drawer'
import { useSearch, type SearchItem } from '../context/search-context'
import { SearchTrigger } from '../components/search-trigger'
import { TextReveal } from '../components/text-reveal'
import { VelocityText } from '../components/velocity-text'
import type { Project as ProjectType } from '../data/projects'

export const Route = createFileRoute('/projects')({
  validateSearch: (search: Record<string, unknown>) => ({
    open: search.open as string | undefined,
  }),
  component: ProjectsPage,
})

function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null)
  const { setItems } = useSearch()
  const { open } = Route.useSearch()

  useEffect(() => {
    if (open) {
      const project = projects.find((p) => p.id === open)
      if (project) setSelectedProject(project)
    }
  }, [open])

  useEffect(() => {
    const searchItems: SearchItem[] = projects.map((p) => ({
      id: p.id,
      type: 'project',
      title: p.title,
      subtitle: p.description,
      description: p.description,
      url: '/projects',
      tags: [p.title.toLowerCase()],
      accent: p.accent,
    }))
    setItems(searchItems)
  }, [setItems])

  return (
    <main className="min-h-screen px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <Section>
          <div className="mb-8 flex items-center justify-between">
            <VelocityText as="h1" intensity={0.003}>
              <TextReveal
                text="Projects"
                className="font-serif text-[clamp(2rem,5vw,3.5rem)] text-fg"
              />
            </VelocityText>
            <SearchTrigger />
          </div>
        </Section>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <Section key={project.id} delay={0.1 + i * 0.05}>
              <ProjectCard project={project} onClick={() => setSelectedProject(project)} />
            </Section>
          ))}
        </div>

        {abandonedProjects.length > 0 && (
          <Section delay={0.3} className="mt-24">
            <h2 className="mb-2 font-serif text-2xl text-fg">What I Did Not Finish</h2>
            <p className="mb-8 font-mono text-sm text-fg-muted">
              Not every project ships. These taught me the most.
            </p>
            <div className="space-y-4">
              {abandonedProjects.map((p) => (
                <div key={p.title} className="rounded-lg border border-border p-6">
                  <h3 className="font-mono text-sm font-medium text-fg">{p.title}</h3>
                  <p className="mt-1 font-serif text-sm leading-relaxed text-fg-muted">
                    {p.description}
                  </p>
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
        )}
      </div>

      <ProjectDrawer project={selectedProject} onClose={() => setSelectedProject(null)} />
    </main>
  )
}
