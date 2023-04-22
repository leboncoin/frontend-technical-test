import { useRouter } from "next/router";
import { useQuery, useMutation } from "react-query";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ChatIcon from "@mui/icons-material/Chat";

import {
  getConversationsByUserId,
  deleteConversation,
} from "@Api/conversations";
import { getUsers } from "@Api/users";

import { formatTimestamp } from "@Utils/date";

import { useUserId } from "@Containers/User/user-context";
import { useNotification } from "@Containers/Notification/notification-context";

import Box from "@Components/Box";
import ConversationCard from "@Components/ConversationCard/";
import IconButton from "@Components/IconButton";

import ModalNewConversation from "./ModalNewConversation";

interface ConversationsProps {
  conversationId?: number;
}
export const Conversations: React.FC<ConversationsProps> = ({
  conversationId,
}) => {
  const router = useRouter();
  const navToConversation = (id: number) => () => {
    router.push(`/conversations/${id}`);
  };

  const [, setOpen] = useNotification();
  const handleOpenNotification = () => setOpen(true);

  const [addConversationModalOpen, setAddOpenConversation] = useState(false);
  const openAddConversationModal = () => setAddOpenConversation(true);
  const closeAddConversationModal = () => setAddOpenConversation(false);

  const { data: conversations } = useQuery("conversations", () =>
    getConversationsByUserId(1)
  );

  const { data: users } = useQuery("users", getUsers);

  const mutationDeleteConversation = useMutation((id: number) =>
    deleteConversation(id)
  );
  const onDeleteConversation = (id: number) => () =>
    mutationDeleteConversation.mutate(id, {
      onError: handleOpenNotification,
    });

  const userId = useUserId();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minheight: "100%",
          height: "calc(100vh - 64px)",
          overflowY: "scroll",
          flex: 1,
        }}
      >
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
          {conversations
            .sort((a, b) =>
              a.lastMessageTimestamp >= b.lastMessageTimestamp ? -1 : 1
            )
            .map(
              ({
                id,
                recipientId,
                recipientNickname,
                senderNickname,
                lastMessageTimestamp,
              }) => {
                return (
                  <ConversationCard
                    key={id}
                    isSelected={id == conversationId}
                    id={id}
                    nickname={
                      recipientId !== userId
                        ? recipientNickname
                        : senderNickname
                    }
                    messageTimestamp={formatTimestamp(lastMessageTimestamp)}
                    onCardClick={navToConversation(id)}
                    onDeleteClick={onDeleteConversation(id)}
                  />
                );
              }
            )}
        </Box>
      </Box>
      <ModalNewConversation
        open={addConversationModalOpen}
        handleClose={closeAddConversationModal}
        userOptions={users.filter(({ id }) => id !== userId)}
      />
    </>
  );
};
