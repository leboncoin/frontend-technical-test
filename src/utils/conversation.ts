import type { Conversation } from '@/types/conversation'

export interface ConversationCounterpart {
  id: number
  nickname: string
}

export function getCounterpart(
  conversation: Conversation,
  currentUserId: number
): ConversationCounterpart {
  if (conversation.recipientId !== currentUserId) {
    return {
      id: conversation.recipientId,
      nickname: conversation.recipientNickname,
    }
  }
  return {
    id: conversation.senderId,
    nickname: conversation.senderNickname,
  }
}

/**
 * True when the message was written by the logged-in user.
 * Ownership drives bubble alignment and is always derived, never stored.
 */
export function isOwnMessage(
  authorId: number,
  currentUserId: number
): boolean {
  return authorId === currentUserId
}

/**
 * Most recent conversation first; the id tiebreak keeps the order stable and
 * deterministic when timestamps collide (e.g. conversations with no messages).
 */
export function byLastMessageDesc(a: Conversation, b: Conversation): number {
  return b.lastMessageTimestamp - a.lastMessageTimestamp || b.id - a.id
}
