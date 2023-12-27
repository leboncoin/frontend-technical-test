import React, { useRef, useState } from "react";
import {
  ConversationContainer,
  ConversationHeaderContainer,
  Input,
  InputContainer,
  MessagesContainer,
  Name,
} from "./chatStyledComponents";
import Messages from "../Messages/Messages";
import { Message } from "../../types/message";
import { Conversation } from "../../types/conversation";
import { getLoggedUserId } from "../../utils/getLoggedUserId";
import { ProfilePic } from "../Card/cardStyledComponents";
import { postMessage } from "../../api/message";
import { useRouter } from "next/router";

interface Props {
  messages: Message[];
  conversation: Conversation;
}

function Chat({ messages, conversation }: Props) {
  const [message, setMessage] = useState<string>("");
  const userId = getLoggedUserId();
  const router = useRouter();
  const chatContainer = useRef(null);

  const handleSendMessage = async () => {
    if (message) {
      const res = await postMessage({
        conversationId: conversation.id,
        userId,
        body: message,
      });
      if (res.length) {
        setMessage("");
        router.replace(router.asPath);
        chatContainer.current.scrollTo({
          top: chatContainer.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }
  };

  const displayName =
    userId === conversation.recipientId
      ? conversation.senderNickname
      : conversation.recipientNickname;

  return (
    <ConversationContainer>
      <ConversationHeaderContainer>
        <ProfilePic>{displayName.charAt(0).toUpperCase()}</ProfilePic>
        <Name>{displayName}</Name>
      </ConversationHeaderContainer>
      <MessagesContainer ref={chatContainer}>
        <Messages messages={messages} />
      </MessagesContainer>
      <InputContainer>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              return handleSendMessage();
            }
          }}
          placeholder="Type your message here ..."
        />
      </InputContainer>
    </ConversationContainer>
  );
}

export default Chat;
