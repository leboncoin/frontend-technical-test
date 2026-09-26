import { ApiError, apiRequest } from './http'
import { isRecord, toId, toNonEmptyString } from './normalize'

/**
 * Minimal user projection used by the UI.
 *
 * API-specific fields such as `token` are intentionally excluded from the
 * application model to avoid unnecessary exposure in frontend state.
 */
export interface UserSummary {
  id: number
  nickname: string
}

function toUserSummary(value: unknown): UserSummary | null {
  if (!isRecord(value)) return null

  const id = toId(value.id)
  const nickname = toNonEmptyString(value.nickname)

  if (id === null || nickname === null) return null

  return { id, nickname }
}

export async function fetchUsers(): Promise<UserSummary[]> {
  const payload = await apiRequest<unknown>('/users')

  if (!Array.isArray(payload)) {
    throw new ApiError('Unexpected users payload from the server.')
  }

  return payload
    .map(toUserSummary)
    .filter((user): user is UserSummary => user !== null)
}
