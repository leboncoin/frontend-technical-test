import type { Conversation } from "@Types/conversation";

export const getConversationsByUserId = async (
  id: number
): Promise<Conversation[]> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_HOST}/conversations/${id}`
    );
    if (!res.ok) throw new Error("Une erreur est survenue !");
    return res.json();
  } catch {
    throw new Error("Une erreur est survenue !");
  }
};

export const addConversation = async (
  conversation: Omit<Conversation, "id">
) => {
  try {
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
    if (!res.ok) throw new Error("Une erreur est survenue !");
    return res.json();
  } catch {
    throw new Error("Une erreur est survenue !");
  }
};

export const deleteConversation = async (conversationId: number) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_HOST}/conversation/${conversationId}`,
      {
        method: "DELETE",
      }
    );
    if (!res.ok) throw new Error("Une erreur est survenue !");
    return res.json();
  } catch {
    throw new Error("Une erreur est survenue !");
  }
};
