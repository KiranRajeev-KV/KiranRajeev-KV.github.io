import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

export function NothingClock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(new Date(now.getTime() + 5.5 * 60 * 60 * 1000))
    }
    update()
    const timer = setInterval(update, 1000)
    return () => clearInterval(timer)
  }, [])

  const hours = time.getUTCHours() % 12
  const minutes = time.getUTCMinutes()
  const seconds = time.getUTCSeconds()

  const hourDeg = hours * 30 + minutes * 0.5
  const minuteDeg = minutes * 6
  const secondDeg = seconds * 6

  const markers = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 - 90) * (Math.PI / 180)
    const isQuarter = i % 3 === 0
    const r = isQuarter ? 44 : 46
    const x = 50 + r * Math.cos(angle)
    const y = 50 + r * Math.sin(angle)
    return { x, y, r: isQuarter ? 1.5 : 1 }
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="mb-6 flex items-center justify-center"
    >
      <svg viewBox="0 0 100 100" className="h-28 w-28" fill="none">
        {/* Outer circle */}
        <circle
          cx="50"
          cy="50"
          r="48"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-border"
        />

        {/* Hour markers */}
        {markers.map((m, i) => (
          <circle key={i} cx={m.x} cy={m.y} r={m.r} className="fill-fg-subtle" />
        ))}

        {/* Hour hand */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-fg"
          style={{ transformOrigin: '50px 50px', transform: `rotate(${hourDeg}deg)` }}
        />

        {/* Minute hand */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-fg-muted"
          style={{ transformOrigin: '50px 50px', transform: `rotate(${minuteDeg}deg)` }}
        />

        {/* Second hand — Nothing red */}
        <g style={{ transformOrigin: '50px 50px', transform: `rotate(${secondDeg}deg)` }}>
          <line x1="50" y1="56" x2="50" y2="10" stroke="#D71921" strokeWidth="0.5" />
          <circle cx="50" cy="10" r="1.5" fill="#D71921" />
        </g>

        {/* Center dot */}
        <circle cx="50" cy="50" r="2" className="fill-fg" />
      </svg>
    </motion.div>
  )
}
