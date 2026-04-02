import { motion } from 'motion/react'

interface TimelineItem {
  year: string
  title: string
  note: string
}

interface TimelineProps {
  items: TimelineItem[]
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative ml-4 border-l border-border">
      {items.map((item, i) => (
        <motion.div
          key={item.year}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="group relative -ml-px pl-6 pb-8 last:pb-0"
        >
          <div className="absolute top-1 -left-1.5 h-3 w-3 rounded-full border-2 border-bg bg-fg-subtle transition-colors group-hover:bg-accent" />
          <span className="font-mono text-xs text-fg-subtle">{item.year}</span>
          <h4 className="mt-0.5 font-mono text-sm font-medium text-fg">{item.title}</h4>
          <div className="absolute top-6 left-6 z-20 hidden w-64 rounded-md border border-border bg-bg-elevated p-3 font-mono text-xs text-fg-muted shadow-lg group-hover:block">
            {item.note}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
