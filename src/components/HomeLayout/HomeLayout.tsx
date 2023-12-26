import React, { ReactElement } from "react";

import { Conversation } from "../../types/conversation";
import Conversations from "../Conversations/Conversations";
import { Layout } from "./homeLayoutStyledComponents";

interface Props {
  conversations: Conversation[];
}

function HomeLayout({ conversations }: Props): ReactElement {
  return (
    <Layout>
      <Conversations conversations={conversations} />
    </Layout>
  );
}

export default HomeLayout;
