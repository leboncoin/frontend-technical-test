import React, { useRef, useState, useEffect } from "react";
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
  const lastMessageRef = useRef(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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
      <MessagesContainer>
        <Messages messages={messages} />
        <div ref={lastMessageRef} />
      </MessagesContainer>
      <InputContainer>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
          placeholder="Type your message here ..."
        />
      </InputContainer>
    </ConversationContainer>
  );
}

export default Chat;
