import React from "react"
import {Box, Typography} from "@mui/material";
import {Message} from "../types/message";
import {useAppSelector} from "../hooks";
import {User} from "../types/user";
import {Conversation} from "../types/conversation";

export interface MessageItemProps {
  message: Message
  conversation: Conversation
}

export default function MessageItem(props: MessageItemProps) {
  const { message, conversation } = props

  const connectedUser: User = useAppSelector((state) => state.user.user)
  const selfMessage = message.authorId === connectedUser.id
  const otherNickname = conversation.senderId === connectedUser.id ? conversation.recipientNickname : conversation.senderNickname

  return (
    <Box>
      {!selfMessage && <Typography>{otherNickname}</Typography>}
      <Box
        bgcolor={selfMessage ? "lightblue" : "lightgray"}
        sx={{
          width: "fit-content",
          borderRadius: 3,
          p: 2,
          mb: 2
        }}
      >
        <Typography>{message.body}</Typography>
      </Box>
    </Box>
  )
}