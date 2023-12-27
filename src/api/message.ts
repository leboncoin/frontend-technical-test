interface MessageInput {
  conversationId: number;
  userId: number;
  body: string;
}

export const postMessage = async ({
  conversationId,
  userId,
  body,
}: MessageInput) => {
  try {
    const responses = await Promise.all([
      fetch(`${process.env.NEXT_API_URL}messages/${conversationId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          conversationId,
          timestamp: new Date().getTime(),
          authorId: userId,
          body,
        }),
      }),
      fetch(`http://localhost:3005/conversation/${conversationId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({
          lastMessageTimestamp: new Date().getTime(),
        }),
      }),
    ]);
    const jsons = await Promise.all(
      responses.map((response) => response.json())
    );
    return jsons;
  } catch (error) {
    throw new Error(error);
  }
};
