import { determineCorrespondent } from '../determineCorrespondent'

describe('determineCorrespondent', () => {
  it('should return id and nickname of my correspondent', () => {
    const expected = { id: 4, nickname: 'Elodie' }
    expect(
      determineCorrespondent({
        userId: 1,
        id: 3,
        recipientId: 1,
        recipientNickname: 'Thibaut',
        senderId: 4,
        senderNickname: 'Elodie',
      })
    ).toStrictEqual(expected)
  })
})
