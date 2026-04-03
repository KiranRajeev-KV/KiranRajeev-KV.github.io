import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'

export function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      setVisible(v > 0.02)
    })
    return () => unsub()
  }, [scrollYProgress])

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-0.5 origin-left bg-accent"
      style={{ scaleX }}
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    />
  )
}
