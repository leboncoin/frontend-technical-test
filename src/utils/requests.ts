import axios from "axios";
import { Conversation } from "../types/conversation";
import { Message } from "../types/message";
import { User } from "../types/user";
import useSWR from "swr";
import { getLoggedUserId } from "./getLoggedUserId";
import { getTimestampFromDate } from "./date";

export const fetchConversations = async (userId: number) => {
  // const response = await axios.get(`http://localhost:3005/conversations/${userId}`);
  const response = await axios.get(`/conversations/${userId}`);

  return response.data as Conversation[];
}

export const fetchMessagesOfConversation = async (conversationId: number) => {
  const response = await axios.get(`/messages/${conversationId}`);

  return response.data as Message[];
}

export const fetchUserInformations = async (userId: number) => {
  const response = await axios.get(`/users/${userId}`);

  return response.data as User;
}

export const sendMessage = async (conversationId: number, body: string) => {
  const userId = getLoggedUserId();
  const response = await axios.post(`/messages/${conversationId}`, {
    body,
    conversationId,
    timestamp: getTimestampFromDate(new Date()),
    authorId: userId,
  });

  return response.data;
}

export const useFetchConversationsOfUser = (userId: number) => {
  const swrResponse = useSWR(['/conversations', userId], (key, id) => fetchConversations(id))
  return swrResponse;
}

export const useFetchMessagesOfConversation = (conversationId: number) => {
  const swrResponse = useSWR(['/messages', conversationId], (key, id) => fetchMessagesOfConversation(id));
  return swrResponse;
}

export const useFetchUserInformation = (userId: number) => {
  const swrResponse = useSWR(['user', userId], (key, id) => fetchUserInformations(id));
  return swrResponse;
}
