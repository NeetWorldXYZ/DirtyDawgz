import { describe, expect, it } from 'vitest'
import { isValidUsPhone, phoneDigits } from './validation'

describe('phoneDigits', () => {
  it('strips formatting characters', () => {
    expect(phoneDigits('(269) 248-1209')).toBe('2692481209')
  })

  it('returns empty string for no digits', () => {
    expect(phoneDigits('abc')).toBe('')
  })
})

describe('isValidUsPhone', () => {
  it('accepts a formatted 10-digit number', () => {
    expect(isValidUsPhone('(269) 248-1209')).toBe(true)
  })

  it('accepts a bare 10-digit number', () => {
    expect(isValidUsPhone('2692481209')).toBe(true)
  })

  it('rejects numbers with too few digits', () => {
    expect(isValidUsPhone('248-1209')).toBe(false)
  })

  it('rejects numbers with too many digits', () => {
    expect(isValidUsPhone('1-269-248-1209')).toBe(false)
  })

  it('rejects empty input', () => {
    expect(isValidUsPhone('')).toBe(false)
  })
})
