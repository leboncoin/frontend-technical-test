import { useCallback, useRef, useState } from 'react'
import { fetchMessages } from '@api/messages'
import { toUserMessage } from '@api/http'
import type { Message } from '@/types/message'
import type { LoadStatus } from '@/types/loading'

export interface ConversationMessages {
  messages: Message[]
  status: LoadStatus
  error: string | null
}

const initialEntry: ConversationMessages = {
  messages: [],
  status: 'idle',
  error: null,
}

/**
 * Lazy, per-conversation message cache.
 *
 * Design note — stale-response safety: message state is keyed by
 * conversation id, so a late response can only ever land in the slot it
 * belongs to. Which conversation is currently rendered is a separate
 * concern (the selected id in the page), so a slow response for
 * conversation A can never overwrite what is displayed for conversation B.
 * A request-id guard is therefore not needed for correctness; a mirror ref
 * additionally deduplicates concurrent loads of the same conversation.
 *
 * Loaded histories are cached: switching back to a conversation shows its
 * messages instantly without refetching (documented trade-off: the cache is
 * not revalidated in the background — the supplied API has no
 * change-notification contract, and polling is explicitly out of scope).
 */
export function useConversationMessages() {
  const [byConversation, setByConversation] = useState<
    Record<number, ConversationMessages>
  >({})
  // Mirror of "a load is in flight or already succeeded" for synchronous reads.
  const requestedRef = useRef<Set<number>>(new Set())

  const load = useCallback(async (conversationId: number) => {
    if (requestedRef.current.has(conversationId)) return
    requestedRef.current.add(conversationId)

    setByConversation((previous) => ({
      ...previous,
      [conversationId]: { messages: [], status: 'loading', error: null },
    }))

    try {
      const messages = await fetchMessages(conversationId)
      setByConversation((previous) => ({
        ...previous,
        [conversationId]: { messages, status: 'success', error: null },
      }))
    } catch (caught) {
      // Allow a manual retry (the user decides, never an automatic loop).
      requestedRef.current.delete(conversationId)
      setByConversation((previous) =>
        previous[conversationId]?.status === 'loading'
          ? {
              ...previous,
              [conversationId]: {
                messages: [],
                status: 'error',
                error: toUserMessage(caught),
              },
            }
          : previous
      )
    }
  }, [])

  /**
   * Appends a message after a confirmed successful send.
   * Falls back gracefully if the history has not been loaded yet.
   */
  const appendMessage = useCallback(
    (conversationId: number, message: Message) => {
      setByConversation((previous) => {
        const entry = previous[conversationId] ?? initialEntry
        return {
          ...previous,
          [conversationId]: {
            ...entry,
            messages: [...entry.messages, message],
            status: 'success',
            error: null,
          },
        }
      })

      if (!requestedRef.current.has(conversationId)) void load(conversationId)
    },
    [load]
  )

  return { byConversation, loadMessages: load, appendMessage }
}
