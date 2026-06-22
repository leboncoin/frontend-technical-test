import { useMutation, useQueryClient } from '@tanstack/react-query'
import { parseCreateIdResponse } from '@/lib/safety/parseApiResponse'
import { queryKeys } from '@/lib/react-query'
import type {
  CreateConversationVariables,
  Message,
  SendMessageContext,
  SendMessageVariables,
} from '@/types'

export const useSendMessageMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ conversationId, userId, body, timestamp }: SendMessageVariables) => {
      const res = await fetch(`/api/messages/${conversationId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationId, authorId: userId, body, timestamp }),
        cache: 'no-store',
      })
      if (!res.ok) throw new Error(`Request failed (${res.status})`)
      const id = parseCreateIdResponse(await res.json())
      if (id === null) throw new Error('Invalid response when sending the message.')
      return id
    },
    onMutate: async ({ conversationId, userId, body, timestamp }) => {
      const messagesKey = queryKeys.messages(conversationId)
      await queryClient.cancelQueries({ queryKey: messagesKey })

      const previousMessages = queryClient.getQueryData<Message[]>(messagesKey)

      const optimisticMessage: Message = {
        id: -Date.now(),
        conversationId,
        authorId: userId,
        timestamp,
        body,
      }

      queryClient.setQueryData<Message[]>(messagesKey, (current = []) => [
        ...current,
        optimisticMessage,
      ])

      return { previousMessages } satisfies SendMessageContext
    },
    onError: (_error, { conversationId }, context) => {
      if (context?.previousMessages) {
        queryClient.setQueryData(queryKeys.messages(conversationId), context.previousMessages)
      }
    },
    onSettled: (_data, _error, { conversationId, userId }) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.messages(conversationId) })
      void queryClient.invalidateQueries({ queryKey: queryKeys.conversations(userId) })
    },
  })
}

export const useCreateConversationMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ userId, recipientId }: CreateConversationVariables) => {
      const res = await fetch(`/api/conversations/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipientId }),
        cache: 'no-store',
      })
      if (!res.ok) throw new Error(`Request failed (${res.status})`)
      const id = parseCreateIdResponse(await res.json())
      if (id === null) throw new Error('Invalid response when creating the conversation.')
      return id
    },
    onSuccess: (_id, { userId }) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.conversations(userId) })
    },
  })
}
