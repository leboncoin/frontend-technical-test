import {
  byLastMessageDesc,
  getCounterpart,
  isOwnMessage,
} from './conversation'
import type { Conversation } from '@/types/conversation'

const senderSide: Conversation = {
  id: 1,
  senderId: 1,
  senderNickname: 'Thibaut',
  recipientId: 2,
  recipientNickname: 'Jeremie',
  lastMessageTimestamp: 1625637849000,
}

// Fixture conversation 3: the logged-in user (1) is the RECIPIENT.
const recipientSide: Conversation = {
  id: 3,
  senderId: 4,
  senderNickname: 'Elodie',
  recipientId: 1,
  recipientNickname: 'Thibaut',
  lastMessageTimestamp: 1625648667000,
}

describe('getCounterpart', () => {
  it('returns the recipient when the logged user is the sender', () => {
    expect(getCounterpart(senderSide, 1)).toEqual({
      id: 2,
      nickname: 'Jeremie',
    })
  })

  it('returns the sender when the logged user is the recipient (fixture conversation 3)', () => {
    expect(getCounterpart(recipientSide, 1)).toEqual({
      id: 4,
      nickname: 'Elodie',
    })
  })

  it('falls back to the recipient side on inconsistent data', () => {
    expect(getCounterpart(senderSide, 99)).toEqual({
      id: 2,
      nickname: 'Jeremie',
    })
  })
})

describe('isOwnMessage', () => {
  it('is true only for the logged user author', () => {
    expect(isOwnMessage(1, 1)).toBe(true)
    expect(isOwnMessage(2, 1)).toBe(false)
  })
})

describe('byLastMessageDesc', () => {
  it('sorts the most recent conversation first', () => {
    expect(
      [senderSide, recipientSide].sort(byLastMessageDesc).map((c) => c.id)
    ).toEqual([3, 1])
  })

  it('breaks timestamp ties deterministically by higher id', () => {
    const a = { ...senderSide, id: 1, lastMessageTimestamp: 0 }
    const b = { ...senderSide, id: 2, lastMessageTimestamp: 0 }
    expect([a, b].sort(byLastMessageDesc)[0].id).toBe(2)
    expect([b, a].sort(byLastMessageDesc)[0].id).toBe(2)
  })
})
