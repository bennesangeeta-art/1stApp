import '@testing-library/jest-dom'

// Mock canvas for jsdom (ConfettiAnimation, PartyPopperAnimation use getContext('2d'))
const mockContext = {
  clearRect: () => {},
  fillRect: () => {},
  fillStyle: '',
  globalAlpha: 1,
  save: () => {},
  restore: () => {},
  translate: () => {},
  rotate: () => {},
  fill: () => {},
  beginPath: () => {},
  arc: () => {},
  getContext: () => mockContext,
}

HTMLCanvasElement.prototype.getContext = () => mockContext
