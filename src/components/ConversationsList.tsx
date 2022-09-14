import React, {useEffect, useState} from "react"
import {User} from "../types/user";
import useHttpClient from "../hooks/useHttpClient";
import {Conversation} from "../types/conversation";
import {useAppSelector} from "../hooks";
import ConversationItem from "./ConversationItem";
import {Box, CircularProgress, Container, Typography} from "@mui/material";

export default function ConversationsList(props) {
  const { updateConv } = props
  const [conversations, setConversations] = useState<Conversation[] | null>([])
  const [isLoading, setIsLoading] = useState(false)
  const httpClient = useHttpClient()
  const connectedUser: User = useAppSelector((state) => state.user.user)

  useEffect(() => {
    if (connectedUser) {
      setIsLoading(true)
      httpClient.get<Conversation[]>(`/conversations/${connectedUser.id}`)
      .then((response) => {
        setConversations(response.data)
      }).catch(() => {
        setConversations(undefined)
      }).finally(() => setIsLoading(false))
    }
  }, [connectedUser, httpClient])

  if (isLoading) {
    return <CircularProgress />
  }

  if (!conversations) {
    return <Typography color="error">Une erreur est survenue</Typography>
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {conversations.map((conv) => <ConversationItem key={conv.id} selectConv={() => updateConv(conv)} conversation={conv} />)}
    </Box>
  )
}