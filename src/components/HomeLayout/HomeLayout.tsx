import React, { ReactElement } from "react";

import { Conversation } from "../../types/conversation";
import Conversations from "../Conversations/Conversations";
import { Container } from "./homeLayoutStyledComponents";

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
