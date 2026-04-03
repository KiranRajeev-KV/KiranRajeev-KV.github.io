import { createFileRoute, Link } from '@tanstack/react-router'
import { Section } from '../components/section'

export const Route = createFileRoute('/404')({
  component: NotFoundPage,
})

function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <Section>
        <div className="text-center">
          <pre className="mb-8 font-mono text-xs leading-relaxed text-fg-subtle">
            {`  ╔══════════════════════════════╗
  ║  404 — page not found      ║
  ║                              ║
  ║  $ cd /page-you-wanted      ║
  ║  bash: no such file or dir  ║
  ╚══════════════════════════════╝`}
          </pre>
          <Link
            to="/"
            className="font-mono text-sm text-fg-muted underline decoration-border underline-offset-4 transition-colors hover:text-fg"
          >
            ← back home
          </Link>
        </div>
      </Section>
    </main>
  )
}
