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
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
