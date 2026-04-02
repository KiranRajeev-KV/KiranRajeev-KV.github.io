import { motion } from 'motion/react'
import { useToast } from './toast'
import { Section } from './section'

const links = [
  { label: 'Email', href: 'mailto:alex@example.com', value: 'alex@example.com' },
  { label: 'GitHub', href: 'https://github.com', value: null },
  { label: 'LinkedIn', href: 'https://linkedin.com', value: null },
]

export function ContactSection() {
  const { showToast } = useToast()

  const copyEmail = async () => {
    await navigator.clipboard.writeText('alex@example.com')
    showToast('Email copied ✓')
  }

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <Section>
          <h2 className="mb-2 font-serif text-3xl text-fg">Get in touch</h2>
          <p className="mb-8 font-mono text-sm text-fg-muted">
            I read every email. Typical reply time: same day.
          </p>

          <div className="mb-6 flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
            <span className="font-mono text-xs text-fg-muted">Open to internships — Summer 2026</span>
          </div>

          <div className="flex flex-col gap-3">
            {links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onClick={link.value ? (e) => { e.preventDefault(); copyEmail() } : undefined}
                className="group flex items-center justify-between rounded-lg border border-border px-6 py-4 transition-colors hover:border-fg-subtle hover:bg-bg-subtle"
              >
                <span className="font-mono text-sm text-fg">{link.label}</span>
                <motion.span
                  className="font-mono text-fg-subtle"
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  →
                </motion.span>
              </motion.a>
            ))}
          </div>
        </Section>
      </div>
    </section>
  )
}
