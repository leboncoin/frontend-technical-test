import type { Message } from "@Types/message";

export const getMessagesByConversationId = async (
  id: number
): Promise<Message[]> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_HOST}/messages/${id}`
    );
    if (!res.ok) throw new Error("Une erreur est survenue !");
    return res.json();
  } catch {
    throw new Error("Une erreur est survenue !");
  }
};

export const addMessage = async (
  message: Omit<Message, "id">,
  conversationId: number
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_HOST}/messages/${conversationId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      }
    );
    if (!res.ok) throw new Error("Une erreur est survenue !");
    return res.json();
  } catch {
    throw new Error("Une erreur est survenue !");
  }
};

export const deleteMessage = async (messageId: number) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_HOST}/message/${messageId}`,
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
