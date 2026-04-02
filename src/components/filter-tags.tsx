import { motion } from 'motion/react'

const filterOptions = ['All', 'Systems', 'Web', 'ML', 'Open Source']

interface FilterTagsProps {
  active: string
  onChange: (filter: string) => void
}

export function FilterTags({ active, onChange }: FilterTagsProps) {
  return (
    <div className="relative flex items-center gap-1 overflow-x-auto font-mono text-sm">
      {filterOptions.map((option, i) => (
        <motion.button
          key={option}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          onClick={() => onChange(option)}
          className={`relative px-3 py-1.5 transition-colors ${
            active === option
              ? 'text-fg'
              : 'text-fg-muted hover:text-fg'
          }`}
        >
          {option}
          {active === option && (
            <motion.div
              layoutId="filter-underline"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-fg"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  )
}
