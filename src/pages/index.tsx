import type { ReactElement } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import type { Conversation } from "../types/conversation";
import { useConversations } from "../hooks/api";
import Header from "../components/Header";
import Avatar from "../components/Avatar";
import LoadingSpinner from "../components/LoadingSpinner";
import NewConversationButton from "../components/NewConversationButton";
import { ErrorDisplay, parseError } from "../utils/errorHandling";

export default function Home(): ReactElement {
  const router = useRouter();
  const { conversations, loading, error, refetch } = useConversations();

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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Header title="Conversations" />

      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: "0 16px",
        }}
      >
        <NewConversationButton
          conversations={conversations}
          onConversationCreated={refetch}
        />
      </div>

            <main
        role="main"
        aria-label="Conversation list"
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "transparent",
          borderRadius: "8px",
          marginTop: "20px",
          padding: "0 16px",
        }}
      >
        {loading && <LoadingSpinner message="Loading conversations..." />}

        {error && (
          <ErrorDisplay
            error={parseError({ message: error })}
            onRetry={() => window.location.reload()}
          />
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

        {!loading && !error && conversations.length > 0 && (
          <ul
            role="list"
            aria-label="Available conversations"
            style={{ listStyle: "none", margin: 0, padding: 0 }}
          >
            {conversations.map((conversation, index) => (
              <li key={conversation.id} role="listitem">
                <div
                  onClick={() => handleConversationClick(conversation)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleConversationClick(conversation);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Open conversation with ${conversation.recipientNickname}`}
                  style={{
                    padding: "16px 20px",
                    marginBottom: index < conversations.length - 1 ? "8px" : "0",
                    borderRadius: "8px",
                    cursor: "pointer",
                    backgroundColor: "white",
                    transition: "background-color 0.2s ease, box-shadow 0.2s ease",
                    outline: "none",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f8f9fa";
                    e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "white";
                    e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.backgroundColor = "#f8f9fa";
                    e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.15)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.backgroundColor = "white";
                    e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
                  }}
                >
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ marginRight: "16px" }}>
                  <Avatar name={conversation.recipientNickname} size={48} />
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
                </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
