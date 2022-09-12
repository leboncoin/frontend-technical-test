import { API_HOST } from './../utils/constants';
import axios from 'axios';
import { Message } from 'src/types/message';

export const getMessagesList = async (conversationId: string): Promise<Message[]> => {
  if (!conversationId) {
    throw new Error('No conversationId provided');
  }

  try {
    const response = await axios.get<Message[]>(`${API_HOST}messages/${conversationId}`);
    return response.data;
  } catch (error) {
    throw new Error('Impossible to fetch messages', error)
  }
};
