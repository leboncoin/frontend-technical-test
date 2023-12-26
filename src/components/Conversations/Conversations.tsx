import React from "react";
import { Conversation } from "../../types/conversation";
import { Container } from "./styledComponents";

interface Props {
  conversations: Conversation[];
}

function Conversations({ conversations }: Props) {
  return (
    <Container>
      {conversations.map((conversation) => (
        <div>{conversation.recipientNickname}</div>
      ))}
    </Container>
  );
}

export default Conversations;
