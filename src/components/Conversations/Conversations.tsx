import React from "react";
import { Conversation } from "../../types/conversation";
import { Container } from "./conversationsStyledComponents";
import Card from "../Card/Card";

interface Props {
  conversations: Conversation[];
}

function Conversations({ conversations }: Props) {
  return (
    <Container>
      {conversations.map((conversation) => (
        <Card conversation={conversation} key={conversation.id}></Card>
      ))}
    </Container>
  );
}

export default Conversations;
