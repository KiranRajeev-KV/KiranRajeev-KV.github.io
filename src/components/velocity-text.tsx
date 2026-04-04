import { useRef, useEffect, useState } from 'react'
import { useScrollVelocity } from '../hooks/use-scroll-velocity'

interface VelocityTextProps {
  children: React.ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  intensity?: number
}

export function VelocityText({
  children,
  className = '',
  as: Tag = 'span',
  intensity = 0.003,
}: VelocityTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const velocity = useScrollVelocity(0.88)
  const [scaleY, setScaleY] = useState(1)

  useEffect(() => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const viewportH = window.innerHeight
    const centerY = rect.top + rect.height / 2
    const progress = centerY / viewportH
    const sineFactor = Math.sin(progress * Math.PI)
    const distortion = 1 + sineFactor * velocity * intensity
    const clamped = Math.max(0.92, Math.min(1.08, distortion))
    setScaleY(clamped)
  }, [velocity, intensity])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `scaleY(${scaleY})`,
        transformOrigin: 'center center',
        willChange: 'transform',
      }}
    >
      <Tag>{children}</Tag>
    </div>
  )
}
