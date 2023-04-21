import { NextPage } from "next";

import { dehydrate, QueryClient } from "react-query";

import { getConversationsByUserId } from "@Api/conversations";
import { getUsers } from "@Api/users";
import { getMessagesByConversationId } from "@Api/messages";

import { getLoggedUserId } from "@Utils/getLoggedUserId";

import Chat from "@Containers/Chat";

interface ConversationPageProps {
  conversationId: number;
}
const ConversationPage: NextPage<ConversationPageProps> = ({
  conversationId,
}) => {
  return <Chat conversationId={conversationId} />;
};

export default ConversationPage;

export async function getServerSideProps(ctx) {
  const conversationId = ctx.query.id;

  const loggedUserId = getLoggedUserId();

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("conversations", () =>
    getConversationsByUserId(loggedUserId)
  );

  await queryClient.prefetchQuery("users", getUsers);

  await queryClient.prefetchQuery(["messages", conversationId], () =>
    getMessagesByConversationId(conversationId)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      conversationId,
    },
  };
}
