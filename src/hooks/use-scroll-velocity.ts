import { useEffect, useRef, useState, useCallback } from 'react'

export function useScrollVelocity(smoothFactor = 0.9) {
  const [velocity, setVelocity] = useState(0)
  const lastScrollY = useRef(0)
  const smoothVelocity = useRef(0)
  const rafId = useRef<number>(0)

  const update = useCallback(() => {
    const currentScrollY = window.scrollY
    const rawVelocity = currentScrollY - lastScrollY.current
    smoothVelocity.current =
      smoothVelocity.current * smoothFactor + rawVelocity * (1 - smoothFactor)
    lastScrollY.current = currentScrollY
    setVelocity(smoothVelocity.current)
    rafId.current = requestAnimationFrame(update)
  }, [smoothFactor])

  useEffect(() => {
    lastScrollY.current = window.scrollY
    rafId.current = requestAnimationFrame(update)
    return () => cancelAnimationFrame(rafId.current)
  }, [update])

  return velocity
}
