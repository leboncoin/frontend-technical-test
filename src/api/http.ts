/**
 * Central HTTP entry point for the messaging API.
 *
 * Every call goes through `apiRequest` so the rest of the app can assume:
 * - `response.ok` is checked (fetch does NOT reject on 4xx/5xx);
 * - thrown errors are always `ApiError` with a user-displayable message;
 * - raw response bodies and internal implementation details never reach the UI;
 * - JSON responses are parsed defensively.
 */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3005'

export class ApiError extends Error {
  readonly status?: number

  constructor(message: string, status?: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError
}

/** User-safe message derived from the HTTP status. */
function messageForStatus(status: number): string {
  if (status === 404) {
    return 'The requested resource was not found.'
  }

  if (status >= 500) {
    return 'The messaging service is temporarily unavailable. Please try again.'
  }

  if (status >= 400) {
    return 'The request was rejected by the server.'
  }

  return 'Unexpected response from the server.'
}

/**
 * Converts an unknown error into a message that is safe to display to users.
 *
 * Only messages explicitly created by our API layer are exposed.
 */
export function toUserMessage(error: unknown): string {
  if (isApiError(error)) {
    return error.message
  }

  return 'Something went wrong. Please try again.'
}

export async function apiRequest<T = unknown>(
  path: string,
  init?: RequestInit
): Promise<T> {
  let response: Response

  try {
    // The fixture API does not provide cache headers. Disable caching so
    // reads always reflect the latest server state.
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      cache: 'no-store',
    })
  } catch {
    // Network-level failure: server down, DNS failure, offline, etc.
    throw new ApiError(
      'Cannot reach the messaging service. Check your connection and try again.'
    )
  }

  if (!response.ok) {
    throw new ApiError(messageForStatus(response.status), response.status)
  }

  try {
    return (await response.json()) as T
  } catch {
    throw new ApiError(
      'The server returned an invalid response.',
      response.status
    )
  }
}

export function postJson<T = unknown>(
  path: string,
  body: unknown
): Promise<T> {
  return apiRequest<T>(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
}

/**
 * Encodes a path parameter so values cannot inject additional path segments.
 */
export function pathParam(value: number | string): string {
  return encodeURIComponent(String(value))
}
