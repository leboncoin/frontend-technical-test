import React from "react"
import useHttpClient from "../hooks/useHttpClient";
import {useQuery} from "@tanstack/react-query";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  FilledInput,
  Typography,
  OutlinedInput, Divider, useTheme
} from "@mui/material";
import {Message} from "../types/message";
import {Conversation} from "../types/conversation";
import MessageItem from "./MessageItem";
import {User} from "../types/user";
import {useAppSelector} from "../hooks";
import {formatTimestamp} from "../utils/formatTimestamp";
import moment from "moment";
import ConversationInputField from "./ConversationInputField";

export interface ConversationViewProps {
  updateConv: (conversation: Conversation) => void
  conversation: Conversation
}

export default function ConversationView(props: ConversationViewProps) {
  const { updateConv, conversation } = props
  const theme = useTheme()
  const httpClient = useHttpClient()
  const { isLoading, error, data: messages, refetch } = useQuery(["convInfos"], (): Promise<Message[]> =>
    httpClient.get(`/messages/${conversation.id}`).then(({ data }) => data)
  )
  const connectedUser: User = useAppSelector((state) => state.user.user)
  const otherNickname = conversation.senderId === connectedUser.id ? conversation.recipientNickname : conversation.senderNickname

  if (isLoading) {
    return <CircularProgress />
  }

  if (error) {
    return <Typography color="error">Une erreur est survenue</Typography>
  }

  const handleClick = () => {
    updateConv(undefined)
  }

  const dateMoment = formatTimestamp(conversation.lastMessageTimestamp)
  const dayString = dateMoment.isSame(moment(), "day") ? "today" : dateMoment.format("MMMM Do")
  const timeString = dateMoment.format("LT")

  return (
    <Box>
      <Button onClick={handleClick}>BACK</Button>
      <Divider />
      <Box bgcolor="lightgray" display="flex" justifyContent="space-between" mt={1} mb={5} p={2}>
        <Typography variant="h6">{otherNickname} - You</Typography>
        <Typography
          variant="h6"
          sx={{
            [theme.breakpoints.down("sm")]: {
              display: "none"
            }
          }}
        >Last message {dayString} at {timeString}</Typography>
      </Box>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end"
      }}>
        {messages.map((message) => <MessageItem key={message.id} message={message} conversation={conversation} />)}
      </Box>
      <ConversationInputField conversationId={conversation.id} />
    </Box>
  )
}
