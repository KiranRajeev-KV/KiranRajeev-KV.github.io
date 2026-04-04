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
      initial={{ opacity: 0, y: 24 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
