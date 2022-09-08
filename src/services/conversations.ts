import { API_HOST } from './../utils/constants';
import axios from 'axios';
import { Conversation } from 'src/types/conversation';

export const getConversations = async (userId: number): Promise<Conversation[]> => {
  if (!userId) {
    throw new Error('No userId provided');
  }

  try {
    const response = await axios.get<Conversation[]>(`${API_HOST}conversations/${userId}`);
    return response.data
  } catch (error) {
    console.error(error);
  }
};
