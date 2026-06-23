import { MAX_MESSAGE_LENGTH } from './constants'

export interface SanitizeResult {
  value: string
  valid: boolean
  error?: string
}

export const sanitizeMessage = (raw: string): SanitizeResult => {
  let value = raw.normalize('NFC')
  value = value.replace(/\0/g, '')
  value = value.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
  value = value.replace(/\n{3,}/g, '\n\n')
  value = value.trim()

  if (!value) {
    return { value: '', valid: false, error: 'Message cannot be empty.' }
  }

  if (value.length > MAX_MESSAGE_LENGTH) {
    return {
      value: value.slice(0, MAX_MESSAGE_LENGTH),
      valid: false,
      error: `Message cannot exceed ${MAX_MESSAGE_LENGTH} characters.`,
    }
  }

  return { value, valid: true }
}
