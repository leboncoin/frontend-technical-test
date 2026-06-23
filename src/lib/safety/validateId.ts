export const validateId = (value: unknown): number | null => {
  if (typeof value === 'number') {
    if (!Number.isInteger(value) || value <= 0) return null
    return value
  }

  if (typeof value !== 'string' || value.trim() === '') return null

  const trimmed = value.trim()
  if (!/^\d+$/.test(trimmed)) return null

  const parsed = Number(trimmed)
  if (!Number.isSafeInteger(parsed) || parsed <= 0) return null

  return parsed
}
