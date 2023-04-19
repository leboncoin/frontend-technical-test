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

export const addConversation = async (userId: number, recipientId: number) => {
  const conversationBody = { recipientId };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_HOST}/conversations/${userId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(conversationBody),
    }
  );

  return res.json();
};
