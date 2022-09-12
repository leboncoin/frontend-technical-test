import { API_HOST } from './../utils/constants';
import axios from 'axios';
import { User } from 'src/types/user';

export const getUser = async (userId: string): Promise<User> => {
  if (!userId) {
    throw new Error('No userId provided');
  }

  try {
    const response = await axios.get<User>(`${API_HOST}user/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Impossible to fetch user', error);
  }
};


export const getAllUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(`${API_HOST}users`);
    return response.data;
  } catch (error) {
    throw new Error('Impossible to fetch user', error);
  }
};