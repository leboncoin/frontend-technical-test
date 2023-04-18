import { NextPage } from "next";

import { getLoggedUserId } from "@Utils/getLoggedUserId";

import ConversationCard from "@Components/ConversationCard/";
import Container from "@Components/Container";

interface IConversation {
  id: number;
  recipientId: number;
  recipientNickname: string;
  senderId: number;
  senderNickname: string;
  lastMessageTimestamp: number;
}

const ConversationsPage: NextPage<{ conversations: IConversation[] }> = ({
  conversations,
}) => (
  <Container>
    <h1>Conversations</h1>
    <section>
      {conversations.map(
        ({
          id,
          recipientId,
          recipientNickname,
          senderId,
          senderNickname,
          lastMessageTimestamp,
        }) => (
          <ConversationCard
            key={id}
            id={id}
            recipientNickname={recipientNickname}
            senderNickname={senderNickname}
          />
        )
      )}
    </section>
  </Container>
);

export default ConversationsPage;

export async function getStaticProps() {
  const loggedUserId = getLoggedUserId();
  const SERVER_HOST = process.env.SERVER_HOST;

  const res = await fetch(`${SERVER_HOST}/conversations/${loggedUserId}`);
  const conversations = await res.json();

  console.log("conversations", conversations);

  return {
    props: {
      conversations,
    },
  };
}
