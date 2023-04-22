import { NextPage } from "next";
import Image from "next/image";
import { dehydrate, QueryClient } from "react-query";

import { getConversationsByUserId } from "@Api/conversations";
import { getUsers } from "@Api/users";

import { getLoggedUserId } from "@Utils/getLoggedUserId";

import Conversations from "@Containers/Conversations";
import { useNotification } from "@Containers/Notification/notification-context";

import AppBar from "@Components/AppBar";
import Toolbar from "@Components/Toolbar";
import Box from "@Components/Box";
import Snackbar from "@Components/Snackbar";
import Alert from "@Components/Alert";

import Logo from "@Assets/lbc-logo.webp";

const ConversationsPage: NextPage = () => {
  const [open, setOpen] = useNotification();
  const handleClose = () => setOpen(false);
  return (
    <>
      <AppBar sx={{ backgroundColor: "common.white" }}>
        <Toolbar sx={{ p: "1rem 24px" }}>
          <Image src={Logo} alt="Leboncoin Frontend Team" width={100} />
        </Toolbar>
      </AppBar>
      <Box pt={8}>
        <Conversations />
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Une erreur est survenue !
        </Alert>
      </Snackbar>
    </>
  );
};

export default ConversationsPage;

export async function getServerSideProps() {
  const loggedUserId = getLoggedUserId();

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("conversations", () =>
    getConversationsByUserId(loggedUserId)
  );

  await queryClient.prefetchQuery("users", getUsers);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
