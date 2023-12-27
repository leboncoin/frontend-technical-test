import React, { useState } from "react";
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

interface Props {
  messages: Message[];
  conversation: Conversation;
}

function Chat({ messages, conversation }: Props) {
  const [message, setMessage] = useState<string>("");

  const handleSendMessage = () => {
    console.log(message);
  };

  const userId = getLoggedUserId();
  console.log("conversation", conversation);
  const currentConversation = conversation[0];

  const displayName =
    userId === currentConversation.recipientId
      ? currentConversation.senderNickname
      : currentConversation.recipientNickname;

  console.log("Display Name:", displayName);

  return (
    <ConversationContainer>
      <ConversationHeaderContainer>
        <ProfilePic>{displayName.charAt(0).toUpperCase()}</ProfilePic>
        <Name>{displayName}</Name>
      </ConversationHeaderContainer>
      <MessagesContainer>
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
