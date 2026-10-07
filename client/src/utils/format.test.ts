import { formatKm } from './format'
import { describe, it, expect } from 'vitest'

describe('formatKm', () => {
  it('should format meters to km', () => {
    expect(formatKm(1000)).toBe(1)
    expect(formatKm(1500)).toBe(1.5)
    expect(formatKm(4567)).toBe(4.6)
    expect(formatKm(0)).toBe(0)
    expect(formatKm(-1000)).toBe(-1)
  })

  it('should not error on NaN', () => {
    expect(formatKm(NaN)).toBe(NaN)
  })

  it('should handle Infinity', () => {
    expect(formatKm(Infinity)).toBe(Infinity)
  })
})
