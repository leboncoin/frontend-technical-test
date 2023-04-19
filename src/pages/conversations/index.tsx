import { NextPage } from "next";
import Image from "next/image";
import AddIcon from "@mui/icons-material/Add";
import ChatIcon from "@mui/icons-material/Chat";

import { getLoggedUserId } from "@Utils/getLoggedUserId";
import { getLastMessageTimeStandFormated } from "@Utils/date";

import Chat from "@Components/Chat";

import Box from "@Components/Box";
import ConversationCard from "@Components/ConversationCard/";
import IconButton from "@Components/IconButton";
import AppBar from "@Components/AppBar";
import Toolbar from "@Components/Toolbar";

import Logo from "@Assets/lbc-logo.webp";

interface IConversation {
  id: number;
  recipientId: number;
  recipientNickname: string;
  senderId: number;
  senderNickname: string;
  lastMessageTimestamp: number;
}

const ConversationsPage: NextPage<{
  conversations: IConversation[];
  messages: any[];
}> = ({ conversations, messages }) => {
  const openAddConversationModal = () => console.log("openModal");
  const handleDeleteConversation = (id: number) => async () =>
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/conversation/${id}`, {
      method: "DELETE",
    });

  return (
    <>
      <AppBar>
        <Toolbar sx={{ p: "1rem 24px" }}>
          <Image src={Logo} alt="Leboncoin Frontend Team" width={100} />
        </Toolbar>
      </AppBar>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              p: "0 1rem",
            }}
          >
            <h1>
              <ChatIcon /> Conversations
            </h1>
            <IconButton
              onClick={openAddConversationModal}
              sx={{
                backgroundColor: "success.light",
                "&:hover": {
                  backgroundColor: "success.main",
                },
              }}
            >
              <AddIcon sx={{ color: "common.white" }} />
            </IconButton>
          </Box>

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
                    onCardClick={handleDeleteConversation(id)}
                  />
                );
              }
            )}
          </section>
        </Box>
        <Chat messages={messages} />
      </Box>
    </>
  );
};

export default ConversationsPage;

export async function getStaticProps() {
  const loggedUserId = getLoggedUserId();

  const resConversations = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_HOST}/conversations/${loggedUserId}`
  );
  const conversations = await resConversations.json();

  const resMessages = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_HOST}/messages/1`
  );
  const messages = await resMessages.json();

  console.log("conversations", conversations);

  return {
    props: {
      conversations,
      messages,
    },
  };
}
