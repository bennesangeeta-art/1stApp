import { useEffect } from 'react'

function RippleWaveAnimation({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.()
    }, 3000)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div
      className="ripple-wave-container"
      aria-hidden="true"
      data-testid="ripple-wave-animation"
    >
      <div className="ripple-wave wave-1" />
      <div className="ripple-wave wave-2" />
      <div className="ripple-wave wave-3" />
      <div className="ripple-wave wave-4" />
    </div>
  )
}

export default RippleWaveAnimation
