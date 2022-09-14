import React from "react";
import {Avatar, Box, Button, Typography, useTheme} from "@mui/material";
import {Conversation} from "../types/conversation";
import {formatTimestamp} from "../utils/formatTimestamp";
import {User} from "../types/user";
import {useAppSelector} from "../hooks";

interface ConversationItemProps {
  selectConv: () => void
  conversation: Conversation
}

export default function ConversationItem(props: ConversationItemProps) {
  const { selectConv, conversation } = props
  const theme = useTheme()
  const connectedUser: User = useAppSelector((state) => state.user.user)
  const shownNickname = conversation.recipientNickname === connectedUser.nickname ? conversation.senderNickname : conversation.recipientNickname

  const dateMoment = formatTimestamp(conversation.lastMessageTimestamp)

  return (
    <Button
      onClick={selectConv}
      sx={{
        [theme.breakpoints.down("sm")]: {
              width: "100%"
            },
        width: "50%"
      }}
    >
      <Box sx={{
        display: "flex",
        textAlign: "left",
        width: "100%",
        justifyContent: "space-evenly"
      }}>
        <Avatar alt={shownNickname}/>
        <Box>
          <Typography color="primary">{shownNickname}</Typography>
          <Typography color="lightgray">{dateMoment.format("MMMM DD")}</Typography>
        </Box>
      </Box>
    </Button>
  )
}
