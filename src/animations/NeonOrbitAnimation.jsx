import { useEffect } from 'react'

function NeonOrbitAnimation({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => onComplete?.(), 3000)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="neon-orbit-container" aria-hidden="true" data-testid="neon-orbit-animation">
      <div className="neon-orbit orbit-1" />
      <div className="neon-orbit orbit-2" />
      <div className="neon-orbit orbit-3" />
    </div>
  )
}

export default NeonOrbitAnimation
