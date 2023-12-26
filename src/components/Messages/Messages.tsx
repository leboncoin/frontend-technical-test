import React from "react";
import { MessageBubble, Timestamp } from "./messagesStyledComponents";
import { Message } from "../../types/message";
import { getLoggedUserId } from "../../utils/getLoggedUserId";

interface Props {
  messages: Message[];
}

function Messages({ messages }: Props) {
  const userId = getLoggedUserId();

  return (
    <>
      {messages.map((message) => (
        <>
          <MessageBubble isOwner={message.authorId === userId}>
            {message.body}
          </MessageBubble>
          <Timestamp isOwner={message.authorId === userId}>
            {new Intl.DateTimeFormat("en-EN", {
              hour: "numeric",
              minute: "numeric",
              month: "short",
              day: "numeric",
            }).format(message.timestamp)}
          </Timestamp>
        </>
      ))}
    </>
  );
}

export default Messages;
