import { useEffect, useState, useRef } from 'react'
import { motion } from 'motion/react'

interface TerminalLine {
  text: string
  prompt?: boolean
  delay: number
}

interface TerminalPromptProps {
  lines: TerminalLine[]
  className?: string
  typingSpeed?: number
  lineDelay?: number
  onComplete?: () => void
}

export function TerminalPrompt({
  lines,
  className = '',
  typingSpeed = 40,
  lineDelay = 200,
  onComplete,
}: TerminalPromptProps) {
  const [visibleLines, setVisibleLines] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    if (lineIndex >= lines.length) return

    const line = lines[lineIndex]
    const initialDelay = lineIndex === 0 ? 300 : line.delay + lineDelay

    timeoutRef.current = setTimeout(
      () => {
        if (charIndex < line.text.length) {
          setCurrentText(line.text.slice(0, charIndex + 1))
          setCharIndex((c) => c + 1)
        } else {
          setVisibleLines((v) => Math.max(v, lineIndex + 1))
          setLineIndex((l) => l + 1)
          setCharIndex(0)
          setCurrentText('')
          if (lineIndex + 1 >= lines.length) {
            onComplete?.()
          }
        }
      },
      charIndex === 0 ? initialDelay : typingSpeed
    )

    return () => clearTimeout(timeoutRef.current)
  }, [lineIndex, charIndex, lines, typingSpeed, lineDelay])

  useEffect(() => {
    const blink = setInterval(() => setShowCursor((s) => !s), 530)
    return () => clearInterval(blink)
  }, [])

  return (
    <div className={`font-mono text-sm ${className}`}>
      {lines.slice(0, visibleLines).map((line, i) => (
        <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-1">
          {line.prompt && <span className="text-accent">{'$ '}</span>}
          <span className={line.prompt ? 'text-fg' : 'text-fg-muted'}>{line.text}</span>
        </motion.div>
      ))}

      {lineIndex < lines.length && (
        <div className="mb-1">
          {lines[lineIndex].prompt && <span className="text-accent">{'$ '}</span>}
          <span className={lines[lineIndex].prompt ? 'text-fg' : 'text-fg-muted'}>
            {currentText}
          </span>
          <motion.span
            animate={{ opacity: showCursor ? 1 : 0 }}
            transition={{ duration: 0.1 }}
            className="inline-block h-4 w-2 bg-fg"
          />
        </div>
      )}
    </div>
  )
}
