import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface TypewriterProps {
  phrases: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
}

export function Typewriter({
  phrases,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2000,
}: TypewriterProps) {
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isFading, setIsFading] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    const phrase = phrases[currentPhrase]

    if (!isDeleting && currentChar < phrase.length) {
      timeoutRef.current = setTimeout(() => {
        setCurrentChar((c) => c + 1)
      }, typingSpeed)
    } else if (!isDeleting && currentChar === phrase.length) {
      timeoutRef.current = setTimeout(() => {
        setIsFading(true)
      }, pauseDuration)
    } else if (isFading) {
      return
    } else {
      timeoutRef.current = setTimeout(() => {
        if (currentChar === 0) {
          setIsDeleting(false)
          setCurrentPhrase((p) => (p + 1) % phrases.length)
        } else {
          setCurrentChar((c) => c - 1)
        }
      }, deletingSpeed)
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [currentChar, currentPhrase, isDeleting, isFading, phrases, typingSpeed, deletingSpeed, pauseDuration])

  const phrase = phrases[currentPhrase]

  return (
    <AnimatePresence mode="wait">
      {isFading ? (
        <motion.span
          key="fade"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          onAnimationComplete={() => {
            setIsFading(false)
            setIsDeleting(true)
            setCurrentChar(phrase.length - 1)
          }}
          className="font-mono text-lg text-fg-muted"
        >
          {phrase}
          <span className="ml-0.5 inline-block h-5 w-0.5 bg-fg-muted" />
        </motion.span>
      ) : (
        <motion.span
          key={`${currentPhrase}-${currentChar}`}
          initial={{ opacity: 1 }}
          className="font-mono text-lg text-fg"
        >
          {phrase.slice(0, currentChar)}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
            className="ml-0.5 inline-block h-5 w-0.5 bg-fg"
          />
        </motion.span>
      )}
    </AnimatePresence>
  )
}
