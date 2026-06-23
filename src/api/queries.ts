import { useQuery } from '@tanstack/react-query'
import { parseConversations, parseMessages, parseUsers } from '@/lib/safety/parseApiResponse'
import { queryKeys } from '@/lib/react-query'

export const useConversationsQuery = (userId: number) =>
  useQuery({
    queryKey: queryKeys.conversations(userId),
    staleTime: 0,
    queryFn: async () => {
      const res = await fetch(`/api/conversations/${userId}`, { cache: 'no-store' })
      if (!res.ok) throw new Error(`Request failed (${res.status})`)
      return parseConversations(await res.json())
    },
  })

export const useMessagesQuery = (conversationId: number | null) =>
  useQuery({
    queryKey: queryKeys.messages(conversationId ?? 0),
    staleTime: 0,
    refetchOnWindowFocus: true,
    queryFn: async () => {
      const res = await fetch(`/api/messages/${conversationId}`, { cache: 'no-store' })
      if (!res.ok) throw new Error(`Request failed (${res.status})`)
      return parseMessages(await res.json())
    },
    enabled: conversationId !== null,
  })

export const useUsersQuery = () =>
  useQuery({
    queryKey: queryKeys.users(),
    queryFn: async () => {
      const res = await fetch('/api/users', { cache: 'no-store' })
      if (!res.ok) throw new Error(`Request failed (${res.status})`)
      return parseUsers(await res.json())
    },
  })
