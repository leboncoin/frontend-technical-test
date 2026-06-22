import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useMessagesQuery } from '@/api/queries'
import { useSendMessageMutation } from '@/api/mutations'
import { canAccessConversation } from '@/lib/conversation'
import type { UseMessageThreadParams } from '@/types'

export const useMessageThread = ({ conversation, loggedUserId }: UseMessageThreadParams) => {
  const { data: messages = [], error, isLoading, refetch } = useMessagesQuery(conversation.id)
  const { mutateAsync: sendMessageMutation } = useSendMessageMutation()
  const bottomRef = useRef<HTMLDivElement>(null)

  const sortedMessages = useMemo(
    () => [...messages].sort((a, b) => a.timestamp - b.timestamp),
    [messages]
  )

  const lastTimestamp =
    sortedMessages.length > 0
      ? sortedMessages[sortedMessages.length - 1].timestamp
      : conversation.lastMessageTimestamp

  const hasAccess = canAccessConversation(conversation, loggedUserId)

  useEffect(() => {
    bottomRef.current?.scrollIntoView?.({ behavior: 'smooth' })
  }, [sortedMessages.length])

  const handleSend = useCallback(
    async (body: string) => {
      const timestamp = Math.floor(Date.now() / 1000)
      await sendMessageMutation({
        conversationId: conversation.id,
        userId: loggedUserId,
        body,
        timestamp,
      })
    },
    [conversation.id, loggedUserId, sendMessageMutation]
  )

  return {
    sortedMessages,
    lastTimestamp,
    hasAccess,
    error,
    isLoading,
    bottomRef,
    handleSend,
    onRetry: () => void refetch(),
    isInputDisabled: Boolean(error),
  }
}
