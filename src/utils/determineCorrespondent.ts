import { Correspondent, CorrespondentQuery } from '../types/correspondent'

export const determineCorrespondent = ({
  userId = 1,
  senderId,
  senderNickname,
  recipientId,
  recipientNickname,
}: CorrespondentQuery): Correspondent => {
  return userId === senderId
    ? { nickname: recipientNickname, id: recipientId }
    : { nickname: senderNickname, id: senderId }
}
