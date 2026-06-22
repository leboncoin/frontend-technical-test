import { QueryClient } from '@tanstack/react-query'

export const queryKeys = {
  conversations: (userId: number) => ['conversations', userId] as const,
  messages: (conversationId: number) => ['messages', conversationId] as const,
  users: () => ['users'] as const,
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
})
