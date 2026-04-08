import { useState, useCallback, useRef } from 'react'
import './animations/animations.css'
import ConfettiAnimation from './animations/ConfettiAnimation'
import PartyPopperAnimation from './animations/PartyPopperAnimation'
import GlowingBurstAnimation from './animations/GlowingBurstAnimation'
import FireworksAnimation from './animations/FireworksAnimation'
import RippleWaveAnimation from './animations/RippleWaveAnimation'
import './App.css'

const ANIMATIONS = [
  'confetti',
  'partyPopper',
  'glowingBurst',
  'fireworks',
  'rippleWave',
]

function App() {
  const [name, setName] = useState('')
  const [greeting, setGreeting] = useState(null)
  const [activeAnimation, setActiveAnimation] = useState(null)
  const animationTimeoutRef = useRef(null)

  const clearAnimation = useCallback(() => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current)
      animationTimeoutRef.current = null
    }
    setActiveAnimation(null)
  }, [])

  const triggerRandomAnimation = useCallback(() => {
    clearAnimation()
    const randomIndex = Math.floor(Math.random() * ANIMATIONS.length)
    const selectedAnimation = ANIMATIONS[randomIndex]

    setActiveAnimation(selectedAnimation)

    const duration = selectedAnimation === 'glowingBurst' ? 2000 : 3000
    animationTimeoutRef.current = setTimeout(() => {
      clearAnimation()
    }, duration)
  }, [clearAnimation])

  const handleGreet = useCallback(() => {
    setGreeting(name.trim() || 'there')
    triggerRandomAnimation()
  }, [name, triggerRandomAnimation])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      handleGreet()
    }
  }, [handleGreet])

  return (
    <div className="app-container" data-testid="app-container">
      <div className="card">
        <h1 className="title">Welcome</h1>

        <label htmlFor="name-input" className="label">
          Enter Your Name
        </label>

        <input
          id="name-input"
          type="text"
          className="input"
          placeholder="Type Your Name Here"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          data-testid="name-input"
          aria-label="Enter your name"
        />

        <button
          className="greet-button"
          onClick={handleGreet}
          data-testid="greet-button"
          type="button"
        >
          Greet
        </button>

        {greeting !== null && (
          <p className="greeting-message" data-testid="greeting-message" role="status">
            Hello {greeting}!
          </p>
        )}
      </div>

      <div className="animation-container" aria-hidden="true">
        {activeAnimation === 'confetti' && (
          <ConfettiAnimation key="confetti" onComplete={clearAnimation} />
        )}
        {activeAnimation === 'partyPopper' && (
          <PartyPopperAnimation key="partyPopper" onComplete={clearAnimation} />
        )}
        {activeAnimation === 'glowingBurst' && (
          <GlowingBurstAnimation key="glowingBurst" onComplete={clearAnimation} />
        )}
        {activeAnimation === 'fireworks' && (
          <FireworksAnimation key="fireworks" onComplete={clearAnimation} />
        )}
        {activeAnimation === 'rippleWave' && (
          <RippleWaveAnimation key="rippleWave" onComplete={clearAnimation} />
        )}
      </div>
    </div>
  )
}

export default App
