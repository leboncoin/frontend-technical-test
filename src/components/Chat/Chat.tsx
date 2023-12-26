import React from "react";
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
        <Input placeholder="Type your message here ..." />
      </InputContainer>
    </ConversationContainer>
  );
}

export default Chat;
