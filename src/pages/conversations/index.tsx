import { NextPage } from "next";

import { getLoggedUserId } from "@Utils/getLoggedUserId";
import { getLastMessageTimeStandFormated } from "@Utils/date";

import ConversationCard from "@Components/ConversationCard/";
import Container from "@Components/Container";

const formatter = new Intl.DateTimeFormat("fr-FR", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: false,
});

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
        }) => {
          return (
            <ConversationCard
              key={id}
              id={id}
              recipientNickname={recipientNickname}
              senderNickname={senderNickname}
              lastMessageTimestamp={getLastMessageTimeStandFormated(
                lastMessageTimestamp
              )}
              onCardClick={() => console.log("cardId", id)}
            />
          );
        }
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
