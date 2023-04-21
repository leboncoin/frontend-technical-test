import { NextPage } from "next";
import Image from "next/image";
import { dehydrate, QueryClient } from "react-query";

import { getConversationsByUserId } from "@Api/conversations";
import { getUsers } from "@Api/users";

import { getLoggedUserId } from "@Utils/getLoggedUserId";

import Conversations from "@Containers/Conversations";

import AppBar from "@Components/AppBar";
import Toolbar from "@Components/Toolbar";
import Box from "@Components/Box";

import Logo from "@Assets/lbc-logo.webp";

const ConversationsPage: NextPage = () => {
  return (
    <>
      <AppBar>
        <Toolbar sx={{ p: "1rem 24px", justifyContent: "center" }}>
          <Image src={Logo} alt="Leboncoin Frontend Team" width={100} />
        </Toolbar>
      </AppBar>
      <Box pt={8}>
        <Conversations />
      </Box>
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
