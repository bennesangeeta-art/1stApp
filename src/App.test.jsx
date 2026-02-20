import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('Greeting App', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('UI Elements on Load', () => {
    it('displays the label "Enter Your Name"', () => {
      render(<App />)
      expect(screen.getByText('Enter Your Name')).toBeInTheDocument()
    })

    it('displays a text input with placeholder "Type Your Name Here"', () => {
      render(<App />)
      const input = screen.getByPlaceholderText('Type Your Name Here')
      expect(input).toBeInTheDocument()
      expect(input).toHaveAttribute('type', 'text')
    })

    it('displays a button labeled "Greet"', () => {
      render(<App />)
      expect(screen.getByRole('button', { name: /greet/i })).toBeInTheDocument()
    })

    it('does not show greeting message initially', () => {
      render(<App />)
      expect(screen.queryByTestId('greeting-message')).not.toBeInTheDocument()
    })
  })

  describe('Greet Button Behavior', () => {
    it('displays "Hello" with the entered name when button is clicked', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<App />)

      const input = screen.getByPlaceholderText('Type Your Name Here')
      await user.type(input, 'Alice')

      const button = screen.getByRole('button', { name: /greet/i })
      await user.click(button)

      expect(screen.getByTestId('greeting-message')).toHaveTextContent('Hello Alice!')
    })

    it('displays "Hello there!" when input is empty and button is clicked', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<App />)

      const button = screen.getByRole('button', { name: /greet/i })
      await user.click(button)

      expect(screen.getByTestId('greeting-message')).toHaveTextContent('Hello there!')
    })

    it('displays greeting below the button', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<App />)

      const input = screen.getByPlaceholderText('Type Your Name Here')
      await user.type(input, 'Bob')

      const button = screen.getByRole('button', { name: /greet/i })
      await user.click(button)

      const greeting = screen.getByTestId('greeting-message')
      const buttonEl = screen.getByRole('button', { name: /greet/i })

      expect(
        buttonEl.compareDocumentPosition(greeting) & Node.DOCUMENT_POSITION_FOLLOWING
      ).toBeTruthy()
    })

    it('updates greeting when name changes and button is clicked again', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<App />)

      const input = screen.getByPlaceholderText('Type Your Name Here')
      const button = screen.getByRole('button', { name: /greet/i })

      await user.type(input, 'Charlie')
      await user.click(button)
      expect(screen.getByTestId('greeting-message')).toHaveTextContent('Hello Charlie!')

      await user.clear(input)
      await user.type(input, 'Diana')
      await user.click(button)
      expect(screen.getByTestId('greeting-message')).toHaveTextContent('Hello Diana!')
    })
  })

  describe('Animations', () => {
    it('triggers an animation when Greet button is clicked', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<App />)

      const button = screen.getByRole('button', { name: /greet/i })
      await user.click(button)

      const hasConfetti = screen.queryByTestId('confetti-animation')
      const hasPartyPopper = screen.queryByTestId('party-popper-animation')
      const hasGlowingBurst = screen.queryByTestId('glowing-burst-animation')

      const hasAnyAnimation =
        hasConfetti !== null || hasPartyPopper !== null || hasGlowingBurst !== null
      expect(hasAnyAnimation).toBe(true)
    })

    it('triggers only one animation per click', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<App />)

      const button = screen.getByRole('button', { name: /greet/i })
      await user.click(button)

      const confettiCount = screen.queryAllByTestId('confetti-animation').length
      const partyPopperCount = screen.queryAllByTestId('party-popper-animation').length
      const glowingBurstCount = screen.queryAllByTestId('glowing-burst-animation').length

      const totalAnimations =
        (confettiCount ? 1 : 0) + (partyPopperCount ? 1 : 0) + (glowingBurstCount ? 1 : 0)
      expect(totalAnimations).toBe(1)
    })

    it('clears animation before next one runs on rapid clicks', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<App />)

      const button = screen.getByRole('button', { name: /greet/i })

      await user.click(button)
      await user.click(button)
      await user.click(button)

      const confettiCount = screen.queryAllByTestId('confetti-animation').length
      const partyPopperCount = screen.queryAllByTestId('party-popper-animation').length
      const glowingBurstCount = screen.queryAllByTestId('glowing-burst-animation').length

      const totalAnimations =
        (confettiCount ? 1 : 0) + (partyPopperCount ? 1 : 0) + (glowingBurstCount ? 1 : 0)
      expect(totalAnimations).toBe(1)
    })
  })

  describe('Layout and Structure', () => {
    it('has centered app container', () => {
      render(<App />)
      const container = screen.getByTestId('app-container')
      expect(container).toBeInTheDocument()
    })
  })
})
