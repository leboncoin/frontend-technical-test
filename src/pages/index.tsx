import type { ReactElement } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import type { Conversation } from "../types/conversation";
import { useConversations } from "../hooks/api";
import Header from "../components/Header";

export default function Home(): ReactElement {
  const router = useRouter();
  const { conversations, loading, error } = useConversations();

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

  const handleConversationClick = (conversation: Conversation) => {
    router.push(`/conversation/page?id=${conversation.id}`);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        backgroundColor: "#f0f2f5",
      }}
    >
      <Head>
        <title>Conversations - Leboncoin</title>
        <meta name="description" content="Chat application for Leboncoin" />
      </Head>

      <Header title="Conversations" />

      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "white",
          borderRadius: "8px",
          marginTop: "20px",
          overflow: "hidden",
          boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
        }}
      >
        {loading && (
          <div
            style={{
              padding: "40px 20px",
              textAlign: "center",
              color: "#65676b",
            }}
          >
            <p>Loading conversations...</p>
          </div>
        )}

        {error && (
          <div
            style={{
              padding: "40px 20px",
              textAlign: "center",
              color: "#e74c3c",
            }}
          >
            <p>Error: {error}</p>
          </div>
        )}

        {!loading && !error && conversations.length === 0 && (
          <div
            style={{
              padding: "40px 20px",
              textAlign: "center",
              color: "#65676b",
            }}
          >
            <p>No conversations yet</p>
          </div>
        )}

        {!loading &&
          !error &&
          conversations.map((conversation, index) => (
            <div
              key={conversation.id}
              onClick={() => handleConversationClick(conversation)}
              style={{
                padding: "16px 20px",
                borderBottom:
                  index < conversations.length - 1
                    ? "1px solid #f0f2f5"
                    : "none",
                cursor: "pointer",
                backgroundColor: "white",
                transition: "background-color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#f8f9fa")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "white")
              }
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    backgroundColor: getAvatarColor(
                      conversation.recipientNickname
                    ),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: "600",
                    fontSize: "18px",
                    marginRight: "16px",
                    flexShrink: 0,
                  }}
                >
                  {conversation.recipientNickname.charAt(0).toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3
                    style={{
                      margin: "0 0 4px 0",
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#1c1e21",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {conversation.recipientNickname}
                  </h3>
                  <p
                    style={{
                      margin: "0",
                      fontSize: "14px",
                      color: "#65676b",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Last message:{" "}
                    {formatTimestamp(conversation.lastMessageTimestamp)}
                  </p>
                </div>
                <div
                  style={{
                    fontSize: "20px",
                    color: "#65676b",
                    marginLeft: "12px",
                  }}
                >
                  →
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
