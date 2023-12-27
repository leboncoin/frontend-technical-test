import React, { ReactElement } from "react";

import { Conversation } from "../../types/conversation";
import Conversations from "../Conversations/Conversations";
import { Layout, Title } from "./homeLayoutStyledComponents";

interface Props {
  conversations: Conversation[];
}

function HomeLayout({ conversations }: Props): ReactElement {
  return (
    <Layout>
      <Title>My messages :</Title>
      <Conversations conversations={conversations} />
    </Layout>
  );
}

export default HomeLayout;
