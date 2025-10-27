import { useState, useEffect, useCallback } from "react";
import type { Conversation } from "../types/conversation";
import type { Message } from "../types/message";
import { getLoggedUserId } from "../utils/getLoggedUserId";

const API_BASE_URL = "http://localhost:3005";

interface UseConversationsReturn {
  conversations: Conversation[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

interface UseMessagesReturn {
  messages: Message[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

interface UseSendMessageReturn {
  sendMessage: (conversationId: number, body: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export function useConversations(): UseConversationsReturn {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConversations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const userId = getLoggedUserId();

      const response = await fetch(`${API_BASE_URL}/db`);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      const allConversations = data.conversations || [];

      const userConversations = allConversations.filter(
        (conv: Conversation) =>
          conv.senderId === userId || conv.recipientId === userId
      );

      setConversations(userConversations);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      console.error("Error fetching conversations:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  return {
    conversations,
    loading,
    error,
    refetch: fetchConversations,
  };
}

export function useMessages(conversationId: number | null): UseMessagesReturn {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    if (!conversationId) {
      setMessages([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${API_BASE_URL}/messages/${conversationId}`
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setMessages(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      console.error("Error fetching messages:", err);
    } finally {
      setLoading(false);
    }
  }, [conversationId]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return {
    messages,
    loading,
    error,
    refetch: fetchMessages,
  };
}

export function useSendMessage(): UseSendMessageReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (conversationId: number, body: string) => {
      try {
        setLoading(true);
        setError(null);

        const userId = getLoggedUserId();
        const response = await fetch(`${API_BASE_URL}/messages`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            conversationId,
            authorId: userId,
            body,
            timestamp: Math.floor(Date.now() / 1000),
          }),
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        console.error("Error sending message:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    sendMessage,
    loading,
    error,
  };
}
