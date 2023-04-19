import { NextPage } from "next";
import Image from "next/image";
import AddIcon from "@mui/icons-material/Add";
import ChatIcon from "@mui/icons-material/Chat";

import { getLoggedUserId } from "@Utils/getLoggedUserId";
import { getLastMessageTimeStandFormated } from "@Utils/date";

import Chat from "@Containers/Chat";

import Box from "@Components/Box";
import ConversationCard from "@Components/ConversationCard/";
import IconButton from "@Components/IconButton";
import AppBar from "@Components/AppBar";
import Toolbar from "@Components/Toolbar";

import Logo from "@Assets/lbc-logo.webp";

const ConversationPage: NextPage<{}> = ({}) => {
  return <Chat messages={[]} />;
};

export default ConversationPage;

export async function getServerSideProps() {
  //   const loggedUserId = getLoggedUserId();

  //   const resConversations = await fetch(
  //     `${process.env.NEXT_PUBLIC_SERVER_HOST}/conversations/${loggedUserId}`
  //   );
  //   const conversations = await resConversations.json();

  //   const resMessages = await fetch(
  //     `${process.env.NEXT_PUBLIC_SERVER_HOST}/messages/1`
  //   );
  //   const messages = await resMessages.json();

  //   console.log("conversations", conversations);

  return {
    props: {},
  };
}
