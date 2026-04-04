import { useEffect, useState, useRef } from 'react'
import { motion } from 'motion/react'

const CHARS =
  '!@#$%^&*()_+-=[]{}|;:,.<>?/~`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

interface TextScrambleProps {
  text: string
  className?: string
  speed?: number
  onComplete?: () => void
}

export function TextScramble({ text, className = '', speed = 50, onComplete }: TextScrambleProps) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined)

  useEffect(() => {
    setDone(false)
    setDisplayed('')

    const chars = text.split('')
    const resolved = Array.from({ length: chars.length }, () => false)
    let elapsed = 0
    const totalDuration = chars.length * speed * 1.5

    intervalRef.current = setInterval(() => {
      elapsed += speed
      const progress = elapsed / totalDuration

      for (let i = 0; i < chars.length; i++) {
        const threshold = (i + 1) / chars.length
        if (progress >= threshold && !resolved[i]) {
          resolved[i] = true
        }
      }

      const current = chars
        .map((char, i) => {
          if (char === ' ') return ' '
          if (resolved[i]) return char
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        })
        .join('')

      setDisplayed(current)

      if (elapsed >= totalDuration) {
        setDisplayed(text)
        setDone(true)
        clearInterval(intervalRef.current)
        onComplete?.()
      }
    }, speed)

    return () => clearInterval(intervalRef.current)
  }, [text, speed, onComplete])

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
    >
      {displayed.split('').map((char, i) => {
        const isResolving = char !== text[i] && char !== ' '
        return (
          <span
            key={i}
            className={isResolving ? 'text-fg-subtle' : done ? 'text-fg-muted' : 'text-fg-muted'}
          >
            {char}
          </span>
        )
      })}
    </motion.span>
  )
}
