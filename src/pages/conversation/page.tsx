import type { ReactElement } from "react";
import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import type { Conversation } from "../../types/conversation";
import type { Message } from "../../types/message";

// TODO: replace mocks with real API integration
const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 1,
    recipientId: 2,
    recipientNickname: "Jeremie",
    senderId: 1,
    senderNickname: "Thibaut",
    lastMessageTimestamp: 1625637849,
  },
  {
    id: 2,
    recipientId: 3,
    recipientNickname: "Patrick",
    senderId: 1,
    senderNickname: "Thibaut",
    lastMessageTimestamp: 1620284667,
  },
  {
    id: 3,
    recipientId: 1,
    recipientNickname: "Thibaut",
    senderId: 4,
    senderNickname: "Elodie",
    lastMessageTimestamp: 1625648667,
  },
];

const MOCK_MESSAGES: Message[] = [
  {
    id: 1,
    conversationId: 1,
    timestamp: 1625637849,
    authorId: 1,
    body: "Bonjour c'est le premier message de la première conversation",
  },
  {
    id: 2,
    conversationId: 1,
    timestamp: 1625637867,
    authorId: 1,
    body: "Bonjour c'est le second message de la première conversation",
  },
  {
    id: 3,
    conversationId: 1,
    timestamp: 1625648667,
    authorId: 2,
    body: "Bonjour c'est le troisième message de la première conversation",
  },
  {
    id: 4,
    conversationId: 2,
    timestamp: 1620284667,
    authorId: 1,
    body: "Bonjour c'est le premier message de la seconde conversation",
  },
];

export default function ConversationDetail(): ReactElement {
  const router = useRouter();
  const { id } = router.query;
  const [newMessage, setNewMessage] = useState("");
  const [conversation, setConversation] = useState<Conversation | null>(null);

  useEffect(() => {
    if (id) {
      const conversationId = parseInt(id as string, 10);
      const foundConversation = MOCK_CONVERSATIONS.find(
        (c) => c.id === conversationId
      );
      setConversation(foundConversation || null);
    }
  }, [id]);

  const getAvatarColor = (name: string): string => {
    const colors = [
      "#f59e0b",
      "#ef4444",
      "#ec4899",
      "#10b981",
      "#3b82f6",
      "#8b5cf6",
      "#f97316",
      "#06b6d4",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const formatTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // TODO: implement send message (POST to API)
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // TODO: send message to backend
      setNewMessage("");
    }
  };

  const handleBackClick = () => {
    router.push("/");
  };

  if (!conversation) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        <p>Loading conversation...</p>
      </div>
    );
  }

  const conversationMessages = MOCK_MESSAGES.filter(
    (msg) => msg.conversationId === conversation.id
  );

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        backgroundColor: "#f8f9fa",
      }}
    >
      <Head>
        <title>{conversation.recipientNickname} - Chat</title>
        <meta
          name="description"
          content={`Chat with ${conversation.recipientNickname}`}
        />
      </Head>

      <div
        style={{
          padding: "16px 20px",
          borderBottom: "1px solid #e1e5e9",
          backgroundColor: "white",
          boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            onClick={handleBackClick}
            style={{
              background: "none",
              border: "none",
              fontSize: "20px",
              cursor: "pointer",
              padding: "8px",
              marginRight: "12px",
              borderRadius: "50%",
              color: "#65676b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ←
          </button>

          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: getAvatarColor(conversation.recipientNickname),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "600",
              fontSize: "16px",
              marginRight: "12px",
            }}
          >
            {conversation.recipientNickname.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2
              style={{
                margin: "0 0 2px 0",
                fontSize: "18px",
                fontWeight: "600",
                color: "#1c1e21",
              }}
            >
              {conversation.recipientNickname}
            </h2>
            <p
              style={{
                margin: "0",
                color: "#65676b",
                fontSize: "13px",
              }}
            >
              Last seen: {formatTimestamp(conversation.lastMessageTimestamp)}
            </p>
          </div>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          padding: "20px",
          overflow: "auto",
        }}
      >
        {conversationMessages.map((message) => (
          <div
            key={message.id}
            style={{
              marginBottom: "16px",
              display: "flex",
              justifyContent:
                message.authorId === 1 ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                maxWidth: "70%",
                padding: "12px 16px",
                borderRadius:
                  message.authorId === 1
                    ? "20px 20px 6px 20px"
                    : "20px 20px 20px 6px",
                backgroundColor: message.authorId === 1 ? "#0084ff" : "white",
                color: message.authorId === 1 ? "white" : "#1c1e21",
                boxShadow: "0 1px 1px rgba(0,0,0,0.1)",
                fontSize: "15px",
                lineHeight: "1.3",
              }}
            >
              <p style={{ margin: "0 0 4px 0" }}>{message.body}</p>
              <small
                style={{
                  opacity: message.authorId === 1 ? 0.8 : 0.6,
                  fontSize: "11px",
                }}
              >
                {formatTimestamp(message.timestamp)}
              </small>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          padding: "16px 20px",
          borderTop: "1px solid #e1e5e9",
          backgroundColor: "white",
          display: "flex",
          gap: "12px",
          alignItems: "flex-end",
        }}
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Type a message..."
          style={{
            flex: 1,
            padding: "12px 16px",
            border: "1px solid #e1e5e9",
            borderRadius: "20px",
            outline: "none",
            fontSize: "15px",
            backgroundColor: "#f8f9fa",
          }}
        />
        <button
          onClick={handleSendMessage}
          disabled={!newMessage.trim()}
          style={{
            padding: "12px 20px",
            backgroundColor: newMessage.trim() ? "#0084ff" : "#e4e6ea",
            color: newMessage.trim() ? "white" : "#bcc0c4",
            border: "none",
            borderRadius: "20px",
            cursor: newMessage.trim() ? "pointer" : "not-allowed",
            fontSize: "14px",
            fontWeight: "600",
            transition: "background-color 0.2s ease",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
