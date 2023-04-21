import { useRouter } from "next/router";
import React, { useRef, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import { getMessagesByConversationId, addMessage } from "@Api/messages";
import { getUsers } from "@Api/users";
import { getConversationsByUserId } from "@Api/conversations";

import { formatTimestamp } from "@Utils/date";

import { useUserId } from "@Containers/User/user-context";
import { useNotification } from "@Containers/Notification/notification-context";

import AppBar from "@Components/AppBar";
import Box from "@Components/Box";
import Avatar, { stringAvatar } from "@Components/Avatar";
import Button from "@Components/Button";
import Toolbar from "@Components/Toolbar";
import Message from "@Components/Message";
import TextField from "@Components/TextField";
import IconButton from "@Components/IconButton";

import type { Message as TMessage } from "@Types/message";

interface ChatProps {
  conversationId: number;
}

export const Chat: React.FC<ChatProps> = ({ conversationId }) => {
  const userId = useUserId();

  const [, setOpenNotification] = useNotification();
  const handleOpenNotification = () => setOpenNotification(true);

  const queryClient = useQueryClient();
  const { data: messages = [] } = useQuery(["messages", conversationId], () =>
    getMessagesByConversationId(conversationId)
  );
  const { data: users } = useQuery("users", getUsers);
  const { data: conversations } = useQuery("conversations", () =>
    getConversationsByUserId(userId)
  );
  const conversation = conversations.filter(
    ({ id }) => conversationId == id
  )[0];

  const nickname =
    conversation.recipientId !== userId
      ? conversation.recipientNickname
      : conversation.senderNickname;

  const mutationMessage = useMutation((message: Omit<TMessage, "id">) => {
    return addMessage(message, conversationId);
  });

  const messageFormRef = useRef<HTMLFormElement>();
  const boxWithOverflowRef = useRef<HTMLDivElement>();

  const [hasToScroll, setHasToScroll] = useState(true);

  const scrollToLastMessage = () => {
    boxWithOverflowRef.current.scrollTo({
      top: boxWithOverflowRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (hasToScroll) {
      scrollToLastMessage();
      setHasToScroll(false);
    }
  }, [hasToScroll]);

  const onAddMessage = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const body = formData.get("message-input");
    const newMessage = {
      body: body.toString(),
      authorId: userId,
      timestamp: Date.now(),
      conversationId,
    };

    mutationMessage.mutate(newMessage, {
      onSuccess: async (newMessage: TMessage) => {
        await queryClient.cancelQueries(["messages", conversationId]);
        const previousConversations = queryClient.getQueryData([
          "messages",
          conversationId,
        ]);
        queryClient.setQueryData(
          ["messages", conversationId],
          (old: TMessage[]) => [...old, newMessage]
        );

        return previousConversations;
      },
      onError: handleOpenNotification,
      onSettled: () => {
        if (messageFormRef.current) messageFormRef.current.reset();
        setHasToScroll(true);
      },
    });
  };

  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("lg"));
  const router = useRouter();
  const navToConversations = () => router.push("/conversations");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: "1",
        height: "calc(100vh - 64px)",
      }}
    >
      <Box
        sx={{
          flex: "1",
          overflow: "hidden",
          pb: 12,
        }}
      >
        <AppBar
          color="primary"
          position="static"
          sx={{
            width: "100%",
            mb: 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Toolbar
            sx={{
              justifyContent: "center",
              position: "relative",
              width: "100%",
            }}
          >
            {isSmallDevice && (
              <IconButton
                onClick={navToConversations}
                sx={{ position: "absolute", left: "8px" }}
              >
                <ArrowBackIosNewIcon sx={{ color: "common.white" }} />
              </IconButton>
            )}
            <Avatar {...stringAvatar(nickname, { mr: 2 })} />
            {nickname}
          </Toolbar>
        </AppBar>
        <Box
          sx={{ height: "100%", overflowY: "scroll" }}
          ref={boxWithOverflowRef}
        >
          {messages.map(({ id, timestamp, authorId, body }) => {
            const author = users.filter(({ id }) => authorId === id)[0]
              .nickname;
            return (
              <Message
                key={id}
                author={author}
                color={authorId == userId ? "primary" : "secondary"}
                timestamp={formatTimestamp(timestamp)}
                align={authorId == userId ? "end" : "start"}
              >
                <>{body}</>
              </Message>
            );
          })}
        </Box>
      </Box>
      <Box
        component="form"
        ref={messageFormRef}
        onSubmit={onAddMessage}
        sx={{ display: "flex", p: 2, backgroundColor: "primary.dark" }}
      >
        <TextField
          label="Nouveau message"
          sx={{ mr: 2, flex: 1 }}
          defaultValue=""
          InputLabelProps={{ sx: { color: "common.white" } }}
          inputProps={{ name: "message-input", sx: { color: "common.white" } }}
        ></TextField>
        <Button color="primary" variant="contained" type="submit">
          Envoyer
        </Button>
      </Box>
    </Box>
  );
};
