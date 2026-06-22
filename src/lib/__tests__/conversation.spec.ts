import { canAccessConversation, getContactId, getContactNickname } from '@/lib/conversation'
import type { Conversation } from '@/types'

const conversation: Conversation = {
  id: 1,
  senderId: 1,
  senderNickname: 'Thibaut',
  recipientId: 2,
  recipientNickname: 'Jeremie',
  lastMessageTimestamp: 1625637849,
}

describe('conversation helpers', () => {
  it('returns the recipient when the logged user is the sender', () => {
    expect(getContactId(conversation, 1)).toBe(2)
    expect(getContactNickname(conversation, 1)).toBe('Jeremie')
  })

  it('returns the sender when the logged user is the recipient', () => {
    expect(getContactId(conversation, 2)).toBe(1)
    expect(getContactNickname(conversation, 2)).toBe('Thibaut')
  })

  it('allows participants and denies third parties', () => {
    expect(canAccessConversation(conversation, 1)).toBe(true)
    expect(canAccessConversation(conversation, 2)).toBe(true)
    expect(canAccessConversation(conversation, 99)).toBe(false)
  })
})
