import { motion } from 'motion/react'

interface Skill {
  name: string
  weight: number
  note: string
}

interface SkillTagProps {
  skill: Skill
}

export function SkillTag({ skill }: SkillTagProps) {
  const sizeMap = {
    5: 'text-base px-3 py-1.5',
    4: 'text-sm px-2.5 py-1',
    3: 'text-sm px-2 py-1',
    2: 'text-xs px-2 py-0.5',
    1: 'text-xs px-1.5 py-0.5',
  }

  return (
    <motion.div
      className="group relative"
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <span
        className={`inline-block cursor-default rounded-full border border-border bg-bg-subtle font-mono text-fg transition-all duration-200 hover:border-fg-subtle hover:bg-bg hover:scale-[1.03] ${sizeMap[skill.weight as keyof typeof sizeMap] || sizeMap[3]}`}
      >
        {skill.name}
      </span>
      <div className="absolute bottom-full left-1/2 z-30 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-bg-elevated px-3 py-1.5 font-mono text-xs text-fg-muted shadow-lg group-hover:block">
        {skill.note}
      </div>
    </motion.div>
  )
}

interface SkillCloudProps {
  label: string
  skills: Skill[]
}

export function SkillCloud({ label, skills }: SkillCloudProps) {
  return (
    <div className="mb-6">
      <h4 className="mb-3 font-mono text-xs uppercase tracking-widest text-fg-subtle">{label}</h4>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <SkillTag key={skill.name} skill={skill} />
        ))}
      </div>
    </div>
  )
}
