import type { FC } from 'react'
import {CircularProgress, Container, Typography} from "@mui/material";
import ConversationsList from "../components/ConversationsList";
import userSlice from "../slices/userSlice";
import {useDispatch} from "react-redux";
import useHttpClient from "../hooks/useHttpClient";
import {useEffect, useState} from "react";
import {getLoggedUserId} from "../utils/getLoggedUserId";
import {useQuery} from "@tanstack/react-query";
import {useAppDispatch} from "../hooks";
import ConversationView from "../components/ConversationView";
import {Conversation} from "../types/conversation";

// Default way to get a logged user
export const loggedUserId = getLoggedUserId()

const userActions = userSlice.actions

const Home: FC = () => {
  const dispatch = useAppDispatch()
  const httpClient = useHttpClient()
  const { isLoading, error, data } = useQuery(["userAuth"], () =>
    httpClient.get(`/users/${loggedUserId}`).then(({ data }) => data)
  )
  const [selectedConversation, setSelectedConversation] = useState<Conversation>(undefined)

  useEffect(() => {
    if (data && !error) {
      dispatch(userActions.setConnectedUser(data))
    }
  }, [data, dispatch, error])

  if (isLoading) {
    return <CircularProgress />
  }

  return (
    <Container maxWidth="xl">
      {!selectedConversation && <ConversationsList updateConv={setSelectedConversation} />}
      {selectedConversation && <ConversationView updateConv={setSelectedConversation} conversation={selectedConversation} />}
    </Container>
  )
}

export default Home
