import { useEffect } from 'react'

function PrismRainAnimation({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => onComplete?.(), 3000)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="prism-rain-container" aria-hidden="true" data-testid="prism-rain-animation">
      <div className="prism-drop drop-1" />
      <div className="prism-drop drop-2" />
      <div className="prism-drop drop-3" />
      <div className="prism-drop drop-4" />
      <div className="prism-drop drop-5" />
    </div>
  )
}

export default PrismRainAnimation
