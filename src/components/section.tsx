import { motion } from 'motion/react'
import { useIntersection } from '../hooks/use-intersection'

interface SectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function Section({ children, className = '', delay = 0 }: SectionProps) {
  const { ref, isVisible } = useIntersection()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.98 }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 24,
        mass: 0.5,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
