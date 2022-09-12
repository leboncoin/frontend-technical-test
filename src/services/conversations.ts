import { API_HOST } from './../utils/constants';
import axios from 'axios';
import { Conversation } from 'src/types/conversation';

export const getConversations = async (userId: number): Promise<Conversation[]> => {
  if (!userId) {
    throw new Error('No userId provided');
  }

  try {
    const response = await axios.get<Conversation[]>(`${API_HOST}conversations/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Impossible to fetch conversation', error);
  }
};

export const newConversation = async (userId: number, recipientId: number, recipientNickname: string): Promise<Conversation> => {
  if (!recipientId) {
    throw new Error('No recipientId provided');
  }

  if (!userId) {
    throw new Error('No userId provided');
  }

  try {
    const response = await axios.post<Conversation>(`${API_HOST}conversations/${userId}`, {
      recipientId: recipientId,
      senderId: userId,
      senderNickname: 'Thibault',
      recipientNickname: recipientNickname,
      lastMessageTimestamp: 1625648667,
    });
    return response.data;
  } catch (error) {
    throw new Error('An error as occured when creating a new conversation', error);
  }
};
