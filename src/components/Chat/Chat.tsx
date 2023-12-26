import React, { useState } from "react";
import {
  ConversationContainer,
  ConversationHeaderContainer,
  Input,
  InputContainer,
  MessagesContainer,
  Name,
  ProfileImage,
} from "./chatStyledComponents";
import Messages from "../Messages/Messages";
import ProfilePic from "../../assets/img-profilepic.jpg";

function Chat({ messages }) {
  const [message, setMessage] = useState<string>("");

  const handleSendMessage = () => {
    console.log(message);
  };

  return (
    <ConversationContainer>
      <ConversationHeaderContainer>
        <ProfileImage src={ProfilePic} />
        <Name>John Doe</Name>
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
