import { API_HOST } from './../utils/constants';
import axios from 'axios';

interface Conversation {
  id: number;
  senderId: number;
  senderNickname: string;
  recipientId: number;
  recipientNickname: string;
  lastMessageTimestamp: number;
}

export const getConversations = async (userId: number): Promise<Conversation[]> => {
  const result = [];
  
  if (!userId) {
    throw new Error('No userId provided');
  }

  try {
    const response = await axios.get(`${API_HOST}${userId}`);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
  return result;
};
