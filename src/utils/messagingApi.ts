import type { Conversation } from '../types/conversation';
import type { Message } from '../types/message';
import type { User } from '../types/user';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3005';

type CreatedResource = {
  id: number;
};

const request = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
    ...init,
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
};

export const getConversations = (userId: number): Promise<Conversation[]> => {
  return request<Conversation[]>(`/conversations/${userId}`);
};

export const createConversation = (
  userId: number,
  conversation: Omit<Conversation, 'id'>
): Promise<CreatedResource> => {
  return request<CreatedResource>(`/conversations/${userId}`, {
    method: 'POST',
    body: JSON.stringify(conversation),
  });
};

export const getMessages = (conversationId: number): Promise<Message[]> => {
  return request<Message[]>(`/messages/${conversationId}`);
};

export const getUsers = (): Promise<User[]> => {
  return request<User[]>('/users');
};

export const sendMessage = (
  conversationId: number,
  authorId: number,
  body: string,
  timestamp: number
): Promise<CreatedResource> => {
  return request<CreatedResource>(`/messages/${conversationId}`, {
    method: 'POST',
    body: JSON.stringify({ authorId, body, conversationId, timestamp }),
  });
};
