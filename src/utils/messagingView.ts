import type { Conversation } from '../types/conversation';
import type { Message } from '../types/message';
import type { User } from '../types/user';

const dateTimeFormatter = new Intl.DateTimeFormat('fr-FR', {
  day: '2-digit',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
});

const conversationDateFormatter = new Intl.DateTimeFormat('fr-FR', {
  day: 'numeric',
  month: 'short',
});

const conversationDateWithYearFormatter = new Intl.DateTimeFormat('fr-FR', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

const conversationTimeFormatter = new Intl.DateTimeFormat('fr-FR', {
  hour: '2-digit',
  minute: '2-digit',
});

export const getConversationParticipant = (
  conversation: Conversation,
  loggedUserId: number
): {
  id: number;
  nickname: string;
} => {
  if (conversation.senderId === loggedUserId) {
    return {
      id: conversation.recipientId,
      nickname: conversation.recipientNickname,
    };
  }

  return {
    id: conversation.senderId,
    nickname: conversation.senderNickname,
  };
};

export const sortConversations = (
  conversations: Conversation[]
): Conversation[] => {
  return [...conversations].sort(
    (a, b) => b.lastMessageTimestamp - a.lastMessageTimestamp
  );
};

export const sortMessages = (messages: Message[]): Message[] => {
  return [...messages].sort((a, b) => a.timestamp - b.timestamp);
};

export const getUserInitial = (nickname: string): string => {
  return nickname.trim().charAt(0).toUpperCase() || '?';
};

export const filterConversationsByParticipant = (
  conversations: Conversation[],
  search: string,
  loggedUserId: number
): Conversation[] => {
  const normalizedSearch = search.trim().toLowerCase();

  if (normalizedSearch.length === 0) {
    return conversations;
  }

  return conversations.filter((conversation) => {
    const participant = getConversationParticipant(conversation, loggedUserId);

    return participant.nickname.toLowerCase().includes(normalizedSearch);
  });
};

export const getAvailableRecipients = (
  users: User[],
  loggedUserId: number
): User[] => {
  return users.filter((user) => user.id !== loggedUserId);
};

export const filterRecipientsByQuery = (
  recipients: User[],
  query: string
): User[] => {
  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery.length === 0) {
    return recipients;
  }

  return recipients.filter((user) =>
    user.nickname.toLowerCase().includes(normalizedQuery)
  );
};

export const findSelectedRecipient = (
  recipients: User[],
  matchingRecipients: User[],
  query: string
): User | null => {
  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery.length === 0) {
    return null;
  }

  return (
    recipients.find(
      (user) => user.nickname.toLowerCase() === normalizedQuery
    ) ?? (matchingRecipients.length === 1 ? matchingRecipients[0] : null)
  );
};

export const findConversationWithParticipant = (
  conversations: Conversation[],
  participantId: number,
  loggedUserId: number
): Conversation | null => {
  return (
    conversations.find(
      (conversation) =>
        getConversationParticipant(conversation, loggedUserId).id ===
        participantId
    ) ?? null
  );
};

export const formatTimestamp = (timestamp: number): string => {
  return dateTimeFormatter.format(new Date(timestamp * 1000));
};

const isSameDay = (date: Date, otherDate: Date): boolean => {
  return (
    date.getFullYear() === otherDate.getFullYear() &&
    date.getMonth() === otherDate.getMonth() &&
    date.getDate() === otherDate.getDate()
  );
};

export const formatConversationTimestamp = (
  timestamp: number,
  currentDate = new Date()
): string => {
  const date = new Date(timestamp * 1000);

  if (isSameDay(date, currentDate)) {
    return conversationTimeFormatter.format(date);
  }

  if (date.getFullYear() === currentDate.getFullYear()) {
    return conversationDateFormatter.format(date);
  }

  return conversationDateWithYearFormatter.format(date);
};
