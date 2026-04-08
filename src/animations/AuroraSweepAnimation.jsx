import { useEffect } from 'react'

function AuroraSweepAnimation({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => onComplete?.(), 3000)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="aurora-sweep-container" aria-hidden="true" data-testid="aurora-sweep-animation">
      <div className="aurora-band band-1" />
      <div className="aurora-band band-2" />
      <div className="aurora-band band-3" />
    </div>
  )
}

export default AuroraSweepAnimation
