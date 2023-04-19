import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";

import AddIcon from "@mui/icons-material/Add";
import ChatIcon from "@mui/icons-material/Chat";

import { getConversationsByUserId } from "@Api/conversations";

import { getLastMessageTimeStandFormated } from "@Utils/date";

import Box from "@Components/Box";
import ConversationCard from "@Components/ConversationCard/";
import IconButton from "@Components/IconButton";

import ModalNewConversation from "./ModalNewConversation";
import { getUsers } from "@Api/users";

export const Conversations: React.FC = () => {
  const router = useRouter();
  const navToConversation = (id: number) => () => {
    router.push(`/conversations/${id}`);
  };

  const { data: conversations } = useQuery("conversations", () =>
    getConversationsByUserId(1)
  );

  const { data: users } = useQuery("users", getUsers);

  const [addConversationModalOpen, setAddOpenConversation] = useState(false);
  const openAddConversationModal = () => setAddOpenConversation(true);
  const closeAddConversationModal = () => setAddOpenConversation(false);

  const handleDeleteConversation = (id: number) => async () => {
    return await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_HOST}/conversation/${id}`,
      {
        method: "DELETE",
      }
    );
  };

  return (
    <>
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

        <Box>
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
                  onCardClick={navToConversation(id)}
                  onDeleteClick={handleDeleteConversation(id)}
                />
              );
            }
          )}
        </Box>
      </Box>
      <ModalNewConversation
        open={addConversationModalOpen}
        handleClose={closeAddConversationModal}
        userOptions={users}
      />
    </>
  );
};
