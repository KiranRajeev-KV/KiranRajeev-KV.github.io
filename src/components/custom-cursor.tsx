import { useEffect, useState, useRef, useCallback } from 'react'
import { motion } from 'motion/react'
import { useCursor } from '../context/cursor-context'

export function CustomCursor() {
  const { enabled } = useCursor()
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [blinking, setBlinking] = useState(true)
  const rafRef = useRef<number>(0)
  const blinkRef = useRef<ReturnType<typeof setInterval>>(undefined)

  const isTouchDevice = useCallback(() => {
    if (typeof window === 'undefined') return false
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches
    )
  }, [])

  useEffect(() => {
    if (isTouchDevice()) return

    const handleMove = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        setPos({ x: e.clientX, y: e.clientY })
      })
      setVisible(true)
    }

    const handleLeave = () => setVisible(false)
    const handleEnter = () => setVisible(true)

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.getAttribute('role') === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('[data-cursor-hover]')

      if (isInteractive) {
        setIsHovering(true)
      }
    }

    const handleOut = () => {
      setIsHovering(false)
    }

    window.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseleave', handleLeave)
    document.addEventListener('mouseenter', handleEnter)
    document.addEventListener('mouseover', handleOver)
    document.addEventListener('mouseout', handleOut)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseleave', handleLeave)
      document.removeEventListener('mouseenter', handleEnter)
      document.removeEventListener('mouseover', handleOver)
      document.removeEventListener('mouseout', handleOut)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isTouchDevice])

  useEffect(() => {
    if (isHovering) {
      blinkRef.current = setInterval(() => {
        setBlinking((b) => !b)
      }, 530)
    } else {
      setBlinking(true)
      if (blinkRef.current) clearInterval(blinkRef.current)
    }
    return () => {
      if (blinkRef.current) clearInterval(blinkRef.current)
    }
  }, [isHovering])

  useEffect(() => {
    if (enabled) {
      document.documentElement.classList.remove('cursor-disabled')
    } else {
      document.documentElement.classList.add('cursor-disabled')
    }
    return () => {
      document.documentElement.classList.remove('cursor-disabled')
    }
  }, [enabled])

  if (!visible || !enabled) return null

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
      animate={{ x: pos.x - 2.5, y: pos.y - 10 }}
      transition={{ type: 'tween', ease: 'linear', duration: 0.05 }}
    >
      <div
        className="h-5 w-[5px] bg-white transition-opacity duration-100"
        style={{ opacity: blinking ? 1 : 0 }}
      />
    </motion.div>
  )
}
