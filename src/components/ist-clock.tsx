import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

export function ISTClock() {
  const [time, setTime] = useState('')
  const [blink, setBlink] = useState(true)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const ist = new Date(now.getTime() + 5.5 * 60 * 60 * 1000)
      const h = ist.getUTCHours().toString().padStart(2, '0')
      const m = ist.getUTCMinutes().toString().padStart(2, '0')
      const s = ist.getUTCSeconds().toString().padStart(2, '0')
      setTime(`${h}:${m}:${s}`)
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)
    const blinkTimer = setInterval(() => setBlink((b) => !b), 500)

    return () => {
      clearInterval(timer)
      clearInterval(blinkTimer)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="mb-6 rounded-lg border border-border p-4 font-mono text-sm"
    >
      <div className="flex items-center gap-2 text-fg-subtle">
        <span className="text-accent">$</span>
        <span>date</span>
      </div>
      <div className="mt-1 text-fg">
        {time.split(':').map((part, i) => (
          <span key={i}>
            {part}
            {i < 2 && <span className={blink ? 'opacity-100' : 'opacity-30'}>:</span>}
          </span>
        ))}
        <span className="ml-2 text-fg-subtle">IST</span>
      </div>
    </motion.div>
  )
}
