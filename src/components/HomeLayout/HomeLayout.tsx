import React, { ReactElement } from "react";
import { Container } from "./styledComponents";
import { Conversation } from "../../types/conversation";
import Conversations from "../Conversations/Conversations";

interface Props {
  conversations: Conversation[];
}

function HomeLayout({ conversations }: Props): ReactElement {
  return (
    <Container>
      <Conversations conversations={conversations} />
    </Container>
  );
}

export default HomeLayout;
