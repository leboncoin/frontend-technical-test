interface ConversationData {
  id: number;
  recipientId: number;
  recipientNickname: string;
  senderId: number;
  senderNickname: string;
  lastMessageTimestamp: number;
}

export const getConversationsByUserId = async (
  id: number
): Promise<ConversationData[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_HOST}/conversations/${id}`
  );
  return res.json();
};
