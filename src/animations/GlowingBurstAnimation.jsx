import { useEffect } from 'react'

function GlowingBurstAnimation({ onComplete }) {
  useEffect(() => {
    const duration = 2000
    const timer = setTimeout(() => {
      onComplete?.()
    }, duration)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div
      className="glowing-burst-container"
      aria-hidden="true"
      data-testid="glowing-burst-animation"
    >
      <div className="glowing-burst burst-1" />
      <div className="glowing-burst burst-2" />
      <div className="glowing-burst burst-3" />
    </div>
  )
}

export default GlowingBurstAnimation
