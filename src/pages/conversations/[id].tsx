import { NextPage } from "next";
import Image from "next/image";
import { dehydrate, QueryClient } from "react-query";

import { getConversationsByUserId } from "@Api/conversations";
import { getUsers } from "@Api/users";
import { getMessagesByConversationId } from "@Api/messages";

import { getLoggedUserId } from "@Utils/getLoggedUserId";

import Conversations from "@Containers/Conversations";
import Chat from "@Containers/Chat";

import Grid from "@Components/Grid";
import AppBar from "@Components/AppBar";
import Toolbar from "@Components/Toolbar";

import Logo from "@Assets/lbc-logo.webp";

interface ConversationPageProps {
  conversationId: number;
}
const ConversationPage: NextPage<ConversationPageProps> = ({
  conversationId,
}) => {
  return (
    <>
      <AppBar>
        <Toolbar
          sx={{
            p: "1rem 24px",
            justifyContent: "center",
          }}
        >
          <Image src={Logo} alt="Leboncoin Frontend Team" width={100} />
        </Toolbar>
      </AppBar>
      <Grid container sx={{ pt: "64px", height: "calc(100vh)" }}>
        <Grid item xs={12} lg={3} sx={{ display: { xs: "none", lg: "flex" } }}>
          <Conversations conversationId={conversationId} />
        </Grid>
        <Grid item xs={12} lg={9}>
          <Chat conversationId={conversationId} />
        </Grid>
      </Grid>
    </>
  );
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
