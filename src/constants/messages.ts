/**
 * Client-side UX guard against pathological input (an accidental
 * multi-megabyte paste). The backend remains the authoritative validator.
 */
export const MAX_MESSAGE_LENGTH = 2000
