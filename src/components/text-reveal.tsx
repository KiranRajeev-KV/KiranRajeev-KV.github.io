import { motion } from 'motion/react'

interface TextRevealProps {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'h3'
  delay?: number
}

export function TextReveal({ text, className = '', as = 'h1', delay = 0 }: TextRevealProps) {
  const words = text.split(' ')

  const Tag = motion[as] as any

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ filter: 'blur(10px)', opacity: 0, y: 8 }}
          whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
            delay: delay + i * 0.08,
          }}
          className="inline-block"
        >
          {word}
          {i < words.length - 1 && <span> </span>}
        </motion.span>
      ))}
    </Tag>
  )
}
