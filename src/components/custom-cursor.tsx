import { useEffect, useState, useRef } from 'react'
import { motion } from 'motion/react'

export function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window
    if (isTouchDevice) return

    const handleMove = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        setPos({ x: e.clientX, y: e.clientY })
      })
      setVisible(true)
    }

    const handleLeave = () => setVisible(false)
    const handleEnter = () => setVisible(true)

    window.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseleave', handleLeave)
    document.addEventListener('mouseenter', handleEnter)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseleave', handleLeave)
      document.removeEventListener('mouseenter', handleEnter)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  if (!visible) return null

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 rounded-full bg-fg mix-blend-difference"
      animate={{ x: pos.x - 4, y: pos.y - 4 }}
      transition={{ type: 'tween', ease: 'linear', duration: 0.05 }}
    />
  )
}
