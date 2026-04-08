import { useEffect, useRef } from 'react'

const COLORS = ['#60a5fa', '#f472b6', '#facc15', '#34d399', '#a78bfa']

function FireworksAnimation({ onComplete }) {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const sparks = []
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    for (let i = 0; i < 90; i += 1) {
      const angle = (Math.PI * 2 * i) / 90
      const speed = 3 + Math.random() * 6
      sparks.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        size: 2 + Math.random() * 3,
        color: COLORS[i % COLORS.length],
      })
    }

    const start = Date.now()
    const duration = 3000

    const animate = () => {
      const elapsed = Date.now() - start
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      sparks.forEach((spark) => {
        spark.x += spark.vx
        spark.y += spark.vy
        spark.vx *= 0.985
        spark.vy *= 0.985
        spark.alpha = Math.max(0, 1 - elapsed / duration)

        if (spark.alpha > 0) {
          ctx.save()
          ctx.globalAlpha = spark.alpha
          ctx.fillStyle = spark.color
          ctx.beginPath()
          ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        }
      })

      if (elapsed < duration) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        onComplete?.()
      }
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [onComplete])

  return (
    <canvas
      ref={canvasRef}
      className="fireworks-canvas"
      aria-hidden="true"
      data-testid="fireworks-animation"
    />
  )
}

export default FireworksAnimation
