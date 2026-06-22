import { useMemo } from 'react'
import { useConversationsQuery } from '@/api/queries'
import { getContactId, getContactNickname } from '@/lib/conversation'
import type { ConversationListParams } from '@/types'

export const useConversationList = ({
  loggedUserId,
  selectedId,
  onSelect,
  onNewConversation,
}: ConversationListParams) => {
  const {
    data: conversations = [],
    error,
    isLoading,
    refetch,
  } = useConversationsQuery(loggedUserId)

  const sorted = useMemo(
    () => [...conversations].sort((a, b) => b.lastMessageTimestamp - a.lastMessageTimestamp),
    [conversations]
  )

  const items = useMemo(
    () =>
      sorted.map((conversation) => ({
        conversation,
        contactNickname: getContactNickname(conversation, loggedUserId),
        contactId: getContactId(conversation, loggedUserId),
        isSelected: selectedId === conversation.id,
      })),
    [sorted, loggedUserId, selectedId]
  )

  return {
    items,
    isLoading,
    error,
    onSelect,
    onRetry: () => void refetch(),
    onNewConversation,
  }
}
