import { motion } from 'motion/react'

interface StaggerListProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  yOffset?: number
}

const container = {
  hidden: { opacity: 0 },
  visible: (delay = 0.06) => ({
    opacity: 1,
    transition: { staggerChildren: delay, delayChildren: 0.1 },
  }),
}

const item = (yOffset = 8) => ({
  hidden: { opacity: 0, y: yOffset },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
})

export function StaggerList({
  children,
  className = '',
  staggerDelay = 0.06,
  yOffset = 8,
}: StaggerListProps) {
  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      custom={staggerDelay}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={item(yOffset)}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  )
}
