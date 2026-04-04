import { useEffect, useRef, useState } from 'react'
import { useRouter } from '@tanstack/react-router'
import { motion, AnimatePresence } from 'motion/react'

export function ProgressBar() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const router = useRouter()
  const creepRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const unsubStart = router.subscribe('onBeforeLoad', () => {
      setVisible(true)
      setProgress(10)

      creepRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return 90
          const remaining = 90 - prev
          const increment = Math.max(1, remaining * 0.15)
          return prev + increment
        })
      }, 200)
    })

    const unsubDone = router.subscribe('onResolved', () => {
      if (creepRef.current) clearInterval(creepRef.current)
      setProgress(100)
      setTimeout(() => {
        setVisible(false)
        setProgress(0)
      }, 200)
    })

    return () => {
      unsubStart()
      unsubDone()
      if (creepRef.current) clearInterval(creepRef.current)
    }
  }, [router])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed top-0 left-0 z-[100] h-0.5 bg-accent"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          exit={{ width: '100%', opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        />
      )}
    </AnimatePresence>
  )
}
