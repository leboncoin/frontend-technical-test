import type { Conversation } from "@Types/conversation";

export const getConversationsByUserId = async (
  id: number
): Promise<Conversation[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_HOST}/conversations/${id}`
  );
  return res.json();
};

export const addConversation = async (
  conversation: Omit<Conversation, "id">
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_HOST}/conversations/${conversation.senderId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(conversation),
    }
  );

  return res.json();
};
