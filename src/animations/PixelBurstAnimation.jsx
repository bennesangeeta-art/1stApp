import { useEffect } from 'react'

function PixelBurstAnimation({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => onComplete?.(), 3000)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="pixel-burst-container" aria-hidden="true" data-testid="pixel-burst-animation">
      <div className="pixel-burst-grid grid-1" />
      <div className="pixel-burst-grid grid-2" />
    </div>
  )
}

export default PixelBurstAnimation
