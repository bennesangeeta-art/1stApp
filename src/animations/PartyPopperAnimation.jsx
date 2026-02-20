import { useEffect, useRef } from 'react'

const STREAMER_COLORS = ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#f43f5e']

function PartyPopperAnimation({ onComplete }) {
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

    const streamers = []
    const streamerCount = 30

    for (let i = 0; i < streamerCount; i++) {
      const angle = (Math.PI * 2 * i) / streamerCount + Math.random() * 0.5
      const speed = 8 + Math.random() * 6
      streamers.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        color: STREAMER_COLORS[i % STREAMER_COLORS.length],
        length: 30 + Math.random() * 40,
        width: 4 + Math.random() * 4,
        rotation: Math.random() * 360,
      })
    }

    const sparks = []
    for (let i = 0; i < 60; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = 4 + Math.random() * 8
      sparks.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 2 + Math.random() * 4,
        alpha: 1,
        decay: 0.02 + Math.random() * 0.02,
      })
    }

    const startTime = Date.now()
    const duration = 2800

    const animate = () => {
      const elapsed = Date.now() - startTime
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      streamers.forEach((s) => {
        s.x += s.vx
        s.y += s.vy
        s.vy += 0.15
        s.vx *= 0.98
        s.vy *= 0.98

        const alpha = Math.max(0, 1 - elapsed / duration)
        ctx.save()
        ctx.globalAlpha = alpha
        ctx.fillStyle = s.color
        ctx.translate(s.x, s.y)
        ctx.rotate(Math.atan2(s.vy, s.vx))
        ctx.fillRect(0, -s.width / 2, s.length, s.width)
        ctx.restore()
      })

      sparks.forEach((s) => {
        s.x += s.vx
        s.y += s.vy
        s.alpha -= s.decay

        if (s.alpha > 0) {
          ctx.save()
          ctx.globalAlpha = s.alpha
          ctx.fillStyle = '#fff'
          ctx.beginPath()
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
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
      className="party-popper-canvas"
      aria-hidden="true"
      data-testid="party-popper-animation"
    />
  )
}

export default PartyPopperAnimation
