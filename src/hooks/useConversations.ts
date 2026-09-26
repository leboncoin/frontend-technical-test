import { useCallback, useEffect, useState } from 'react'
import { fetchConversations } from '@api/conversations'
import { toUserMessage } from '@api/http'
import type { Conversation } from '@/types/conversation'
import type { LoadStatus } from '@/types/loading'
import { byLastMessageDesc } from '@utils/conversation'

/**
 * Loads and owns the conversation list for the logged-in user.
 *
 * Local React state is sufficient here (no Redux/React Query): one list, one
 * owner, simple derived updates. A refresh failure keeps the previously
 * loaded data visible — error status is tracked separately from the data.
 */
export function useConversations(userId: number) {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [status, setStatus] = useState<LoadStatus>('loading')
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setStatus('loading')
    setError(null)
    try {
      const list = await fetchConversations(userId)
      setConversations(list)
      setStatus('success')
    } catch (caught) {
      setError(toUserMessage(caught))
      setStatus('error')
    }
  }, [userId])

  useEffect(() => {
    void load()
  }, [load])

  /** Inserts/replaces a conversation (Bonus 1) and re-sorts the list. */
  const upsertConversation = useCallback((conversation: Conversation) => {
    setConversations((previous) =>
      [
        conversation,
        ...previous.filter((item) => item.id !== conversation.id),
      ].sort(byLastMessageDesc)
    )
  }, [])

  /**
   * Bumps a conversation's activity after a confirmed send, without a
   * full-list refetch (json-server does not cascade message posts to the
   * conversation record).
   */
  const touchConversation = useCallback(
    (conversationId: number, timestampMs: number) => {
      setConversations((previous) =>
        previous
          .map((item) =>
            item.id === conversationId
              ? {
                  ...item,
                  lastMessageTimestamp: Math.max(
                    item.lastMessageTimestamp,
                    timestampMs
                  ),
                }
              : item
          )
          .sort(byLastMessageDesc)
      )
    },
    []
  )

  return {
    conversations,
    status,
    error,
    retry: load,
    upsertConversation,
    touchConversation,
  }
}
