import {
  isRecord,
  toFiniteNumber,
  toId,
  toMsTimestamp,
  toNonEmptyString,
} from './normalize'

describe('toMsTimestamp', () => {
  it('converts Unix seconds numbers to milliseconds', () => {
    expect(toMsTimestamp(1625637849)).toBe(1625637849000)
  })

  it('converts numeric strings (Swagger declares Message.timestamp as string)', () => {
    expect(toMsTimestamp('1625637849')).toBe(1625637849000)
  })

  it('keeps already-millisecond values untouched', () => {
    expect(toMsTimestamp(1625637849000)).toBe(1625637849000)
  })

  it('parses ISO-8601 strings', () => {
    expect(toMsTimestamp('2021-07-07T08:00:00Z')).toBe(
      Date.parse('2021-07-07T08:00:00Z')
    )
  })

  it('returns null for non-numeric garbage', () => {
    expect(toMsTimestamp('not a date')).toBeNull()
  })

  it('returns null for empty or whitespace strings', () => {
    expect(toMsTimestamp('')).toBeNull()
    expect(toMsTimestamp('   ')).toBeNull()
  })

  it('returns null for non-positive, NaN or non-scalar values', () => {
    expect(toMsTimestamp(0)).toBeNull()
    expect(toMsTimestamp(-42)).toBeNull()
    expect(toMsTimestamp(Number.NaN)).toBeNull()
    expect(toMsTimestamp(null)).toBeNull()
    expect(toMsTimestamp(undefined)).toBeNull()
    expect(toMsTimestamp({})).toBeNull()
    expect(toMsTimestamp([1625637849])).toBeNull()
  })
})

describe('toFiniteNumber', () => {
  it('accepts finite numbers only', () => {
    expect(toFiniteNumber(3)).toBe(3)
    expect(toFiniteNumber('3')).toBeNull()
    expect(toFiniteNumber(Number.POSITIVE_INFINITY)).toBeNull()
    expect(toFiniteNumber(null)).toBeNull()
  })
})

describe('toNonEmptyString', () => {
  it('accepts non-empty strings only', () => {
    expect(toNonEmptyString('hello')).toBe('hello')
    expect(toNonEmptyString('   ')).toBeNull()
    expect(toNonEmptyString(42)).toBeNull()
  })
})

describe('toId', () => {
  it('accepts non-negative integers only', () => {
    expect(toId(7)).toBe(7)
    expect(toId(0)).toBe(0)
    expect(toId(7.5)).toBeNull()
    expect(toId(-1)).toBeNull()
    expect(toId('7')).toBeNull()
    expect(toId(null)).toBeNull()
  })
})

describe('isRecord', () => {
  // Deliberately loose: any non-null object passes; the per-field coercion
  // functions are what actually reject malformed rows.
  it('accepts non-null objects, rejects null and primitives', () => {
    expect(isRecord({ id: 1 })).toBe(true)
    expect(isRecord([1])).toBe(true)
    expect(isRecord(null)).toBe(false)
    expect(isRecord(undefined)).toBe(false)
    expect(isRecord('text')).toBe(false)
  })
})
