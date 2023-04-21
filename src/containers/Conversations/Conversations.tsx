import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery, useMutation } from "react-query";

import AddIcon from "@mui/icons-material/Add";
import ChatIcon from "@mui/icons-material/Chat";

import {
  getConversationsByUserId,
  deleteConversation,
} from "@Api/conversations";
import { getUsers } from "@Api/users";

import { getLastMessageTimeStandFormated } from "@Utils/date";

import { useUserId } from "@Containers/User/user-context";
import { useNotification } from "@Containers/Notification/notification-context";

import Box from "@Components/Box";
import ConversationCard from "@Components/ConversationCard/";
import IconButton from "@Components/IconButton";
import Snackbar from "@Components/Snackbar";
import Alert from "@Components/Alert";

import ModalNewConversation from "./ModalNewConversation";

export const Conversations: React.FC = () => {
  const router = useRouter();
  const navToConversation = (id: number) => () => {
    router.push(`/conversations/${id}`);
  };
  const [open, setOpen] = useNotification();
  const handleOpenNotification = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const [addConversationModalOpen, setAddOpenConversation] = useState(false);
  const openAddConversationModal = () => setAddOpenConversation(true);
  const closeAddConversationModal = () => setAddOpenConversation(false);

  const userId = useUserId();
  const userWithConv = conversations.reduce((acc, curr) => {
    if (curr.senderId === userId || curr.recipientId === userId) {
      const id = curr.senderId !== userId ? curr.senderId : curr.recipientId;
      return acc.includes(id) ? acc : [...acc, id];
    }
    return acc;
  }, []);

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
              recipientNickname,
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
        userOptions={users.filter(
          ({ id }) => !userWithConv.includes(id) && id !== userId
        )}
      />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Une erreur est survenue !
        </Alert>
      </Snackbar>
    </>
  );
};
