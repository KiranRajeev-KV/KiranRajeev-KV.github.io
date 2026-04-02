import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/~`'

interface KineticTextProps {
  text: string
  className?: string
}

export function KineticText({ text, className = '' }: KineticTextProps) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('kinetic-done')) {
      setDisplayed(text)
      setDone(true)
      return
    }

    const duration = 600
    const interval = 50
    let elapsed = 0
    const chars = text.split('')
    const resolved = new Array(chars.length).fill(false)

    const timer = setInterval(() => {
      elapsed += interval
      const progress = elapsed / duration

      for (let i = 0; i < chars.length; i++) {
        const charThreshold = (i + 1) / chars.length
        if (progress >= charThreshold && !resolved[i]) {
          resolved[i] = true
        }
      }

      const current = chars
        .map((char, i) => {
          if (char === ' ') return ' '
          if (resolved[i]) return char
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        })
        .join('')

      setDisplayed(current)

      if (elapsed >= duration) {
        setDisplayed(text)
        setDone(true)
        clearInterval(timer)
        sessionStorage.setItem('kinetic-done', 'true')
      }
    }, interval)

    return () => clearInterval(timer)
  }, [text])

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {displayed.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          animate={
            done
              ? {}
              : {
                  color: char !== text[i] && char !== ' ' ? 'var(--color-fg-subtle)' : undefined,
                }
          }
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}
