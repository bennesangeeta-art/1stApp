import { useEffect } from 'react'

function StarShowerAnimation({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => onComplete?.(), 3000)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="star-shower-container" aria-hidden="true" data-testid="star-shower-animation">
      <div className="star-row row-1" />
      <div className="star-row row-2" />
      <div className="star-row row-3" />
      <div className="star-row row-4" />
    </div>
  )
}

export default StarShowerAnimation
