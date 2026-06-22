import { validateId } from '../../lib/safety/validateId'

describe('validateId', () => {
  it('accepts positive integers as strings', () => {
    expect(validateId('42')).toBe(42)
  })

  it('accepts positive integers as numbers', () => {
    expect(validateId(3)).toBe(3)
  })

  it('rejects zero and negative values', () => {
    expect(validateId('0')).toBeNull()
    expect(validateId('-1')).toBeNull()
    expect(validateId(-5)).toBeNull()
  })

  it('rejects non-numeric strings', () => {
    expect(validateId('1;DROP TABLE')).toBeNull()
    expect(validateId('abc')).toBeNull()
    expect(validateId('')).toBeNull()
  })

  it('rejects floats', () => {
    expect(validateId('1.5')).toBeNull()
    expect(validateId(1.5)).toBeNull()
  })
})
