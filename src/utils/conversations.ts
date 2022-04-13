import { Conversation } from "../types/conversation";
import { getLoggedUserId } from "./getLoggedUserId";

export const getInterlocutorNameOfConversation = (conversation: Conversation) => {
  const userId = getLoggedUserId();
  return conversation.recipientId !== userId ? conversation.recipientNickname : conversation.senderNickname;
}