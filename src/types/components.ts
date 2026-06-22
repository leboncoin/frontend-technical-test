import type { ReactNode } from 'react'
import type { Conversation, Message } from './domain'

export interface AvatarProps {
  nickname: string
  id?: number
  size?: number
}

export interface LayoutProps {
  children: ReactNode
}

export interface ErrorSnackbarProps {
  message: string
  onRetry: () => void
  onDismiss?: () => void
  retryInMs?: number
}

export interface ConversationHeaderProps {
  contactName: string
  lastMessageTimestamp: number | null
  onBack?: () => void
}

export interface ConversationItemProps {
  conversation: Conversation
  contactNickname: string
  contactId: number
  isSelected: boolean
  onSelect: (id: number) => void
}

export interface ConversationListParams {
  loggedUserId: number
  selectedId: number | null
  onSelect: (id: number) => void
  onNewConversation: () => void
}

export interface MessageBubbleProps {
  message: Message
  isOwn: boolean
  authorName?: string
}

export interface MessageInputProps {
  conversationId: number
  onSend: (body: string) => Promise<void>
  disabled?: boolean
}

export interface MessageThreadProps {
  conversation: Conversation
  loggedUserId: number
  contactName: string
  authorName: string
  onBack?: () => void
}

export interface UseMessageThreadParams {
  conversation: Conversation
  loggedUserId: number
}

export interface NewConversationModalParams {
  loggedUserId: number
  isOpen: boolean
  onClose: () => void
  onCreated: (conversationId: number) => void
}
