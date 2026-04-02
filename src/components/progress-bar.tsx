import { useEffect, useState } from 'react'
import { useRouter } from '@tanstack/react-router'
import { motion, AnimatePresence } from 'motion/react'

export function ProgressBar() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const unsubStart = router.subscribe('onBeforeLoad', () => {
      setVisible(true)
      setProgress(30)
    })

    const unsubDone = router.subscribe('onResolved', () => {
      setProgress(100)
      setTimeout(() => {
        setVisible(false)
        setProgress(0)
      }, 200)
    })

    return () => {
      unsubStart()
      unsubDone()
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
