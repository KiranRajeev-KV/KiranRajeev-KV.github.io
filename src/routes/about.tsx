import { createFileRoute, Link } from '@tanstack/react-router'
import { about } from '../data/about'
import { Section } from '../components/section'
import { SkillCloud } from '../components/skill-tag'
import { Timeline } from '../components/timeline'
import { TextReveal } from '../components/text-reveal'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <main className="min-h-screen px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <Section>
          <TextReveal text="About" className="mb-16 font-serif text-4xl text-fg" />
        </Section>

        <div className="grid gap-16 md:grid-cols-[1fr_280px]">
          <div>
            <Section>
              <blockquote className="mb-8 border-l-2 border-border pl-4 font-serif text-lg italic text-fg-subtle">
                "The best way to predict the future is to invent it." — Alan Kay
              </blockquote>
              <div className="prose prose-fg max-w-none">
                {about.bio.split('\n\n').map((paragraph, i) => (
                  <p
                    key={i}
                    className="mb-4 font-serif text-base leading-relaxed text-fg last:mb-0"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Section>

            {about.timeline.length > 0 && (
              <Section delay={0.1} className="mt-12">
                <Timeline items={about.timeline} />
              </Section>
            )}
          </div>

          <div>
            <Section delay={0.15}>
              <div className="sticky top-32 rounded-lg border border-border p-6">
                <dl className="space-y-4">
                  <div>
                    <dt className="font-mono text-xs uppercase tracking-widest text-fg-subtle">
                      Location
                    </dt>
                    <dd className="mt-1 font-mono text-sm text-fg">{about.location}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-xs uppercase tracking-widest text-fg-subtle">
                      University
                    </dt>
                    <dd className="mt-1 font-mono text-sm text-fg">{about.university}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-xs uppercase tracking-widest text-fg-subtle">
                      Degree
                    </dt>
                    <dd className="mt-1 font-mono text-sm text-fg">{about.major}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-xs uppercase tracking-widest text-fg-subtle">
                      Graduation
                    </dt>
                    <dd className="mt-1 font-mono text-sm text-fg">{about.graduation}</dd>
                  </div>
                  <div className="border-t border-border pt-4">
                    <dt className="font-mono text-xs uppercase tracking-widest text-fg-subtle">
                      Currently Building
                    </dt>
                    <dd className="mt-1 font-mono text-sm text-fg">{about.currentlyBuilding}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-xs uppercase tracking-widest text-fg-subtle">
                      Currently Reading
                    </dt>
                    <dd className="mt-1 font-mono text-sm text-fg">{about.currentlyReading}</dd>
                  </div>
                </dl>

                <Link
                  to="/now"
                  className="mt-6 block border-t border-border pt-4 font-mono text-xs text-fg-muted underline decoration-border underline-offset-4 transition-colors hover:text-fg hover:decoration-fg-subtle"
                >
                  What I'm focused on right now →
                </Link>
              </div>
            </Section>
          </div>
        </div>

        <Section delay={0.2} className="mt-20">
          <h2 className="mb-8 font-mono text-xs uppercase tracking-widest text-fg-subtle">
            Skills
          </h2>
          {Object.entries(about.skills).map(([label, skills]) => (
            <SkillCloud key={label} label={label} skills={skills} />
          ))}
        </Section>
      </div>
    </main>
  )
}
