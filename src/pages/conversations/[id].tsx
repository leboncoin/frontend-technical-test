import { NextPage } from "next";
import Image from "next/image";
import { dehydrate, QueryClient } from "react-query";

import { getConversationsByUserId } from "@Api/conversations";
import { getUsers } from "@Api/users";
import { getMessagesByConversationId } from "@Api/messages";

import { getLoggedUserId } from "@Utils/getLoggedUserId";

import Conversations from "@Containers/Conversations";
import Chat from "@Containers/Chat";
import { useNotification } from "@Containers/Notification/notification-context";

import Grid from "@Components/Grid";
import AppBar from "@Components/AppBar";
import Toolbar from "@Components/Toolbar";
import Snackbar from "@Components/Snackbar";
import Alert from "@Components/Alert";

import Logo from "@Assets/lbc-logo.webp";

interface ConversationPageProps {
  conversationId: number;
}
const ConversationPage: NextPage<ConversationPageProps> = ({
  conversationId,
}) => {
  const [open, setOpen] = useNotification();
  const handleClose = () => setOpen(false);
  return (
    <>
      <AppBar sx={{ backgroundColor: "common.white" }}>
        <Toolbar
          sx={{
            p: "1rem 24px",
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
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Une erreur est survenue !
        </Alert>
      </Snackbar>
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
