import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'

interface MagneticProps {
  children: React.ReactNode
  strength?: number
  className?: string
  onClick?: () => void
  href?: string
  target?: string
  rel?: string
  as?: 'button' | 'a' | 'div'
}

export function Magnetic({
  children,
  strength = 0.4,
  className = '',
  onClick,
  href,
  target,
  rel,
  as = 'button',
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, {
    stiffness: 200,
    damping: 20,
    mass: 0.5,
    restDelta: 0.001,
  })
  const springY = useSpring(y, {
    stiffness: 200,
    damping: 20,
    mass: 0.5,
    restDelta: 0.001,
  })

  const smoothX = useTransform(springX, (v) => v * 0.8)
  const smoothY = useTransform(springY, (v) => v * 0.8)

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const offsetX = (e.clientX - centerX) * strength
    const offsetY = (e.clientY - centerY) * strength
    x.set(offsetX)
    y.set(offsetY)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  const Component = as === 'a' ? 'a' : as === 'button' ? 'button' : 'div'

  return (
    <motion.div
      ref={ref}
      style={{ x: smoothX, y: smoothY }}
      onMouseMove={handleMouse}
      onMouseEnter={() => {}}
      onMouseLeave={handleLeave}
      className={className}
    >
      <Component onClick={onClick} href={href} target={target} rel={rel}>
        {children}
      </Component>
    </motion.div>
  )
}
