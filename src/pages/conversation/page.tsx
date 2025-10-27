import type { ReactElement } from "react";
import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import type { Conversation } from "../../types/conversation";
import { useConversations, useMessages, useSendMessage } from "../../hooks/api";
import Header from "../../components/Header";
import Avatar from "../../components/Avatar";
import LoadingSpinner from "../../components/LoadingSpinner";
import { ErrorDisplay, parseError } from "../../utils/errorHandling";

export default function ConversationDetail(): ReactElement {
  const router = useRouter();
  const { id } = router.query;
  const [newMessage, setNewMessage] = useState("");

  const conversationId = id ? parseInt(id as string, 10) : null;
  const { conversations } = useConversations();
  const {
    messages,
    loading: messagesLoading,
    error: messagesError,
    refetch: refetchMessages,
  } = useMessages(conversationId);
  const {
    sendMessage,
    loading: sendingMessage,
    error: sendError,
  } = useSendMessage();

  const conversation =
    conversations.find((c) => c.id === conversationId) || null;

  const formatTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() && conversationId) {
      try {
        await sendMessage(conversationId, newMessage.trim());
        setNewMessage("");
        refetchMessages();
      } catch (error) {
        console.error("Failed to send message:", error);
      }
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
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        <p>Loading conversation...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
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

      <Header />

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
            aria-label="Go back to conversation list"
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

          <div style={{ marginRight: "12px" }}>
            <Avatar name={conversation.recipientNickname} size={40} />
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

      <main
        role="main"
        aria-label={`Messages in conversation with ${conversation.recipientNickname}`}
        style={{
          flex: 1,
          padding: "20px",
          overflow: "auto",
        }}
      >
        {messagesLoading && <LoadingSpinner message="Loading messages..." />}

        {messagesError && (
          <ErrorDisplay
            error={parseError({ message: messagesError })}
            onRetry={refetchMessages}
          />
        )}

        {!messagesLoading &&
          !messagesError &&
          messages.map((message) => (
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
      </main>

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
        {sendError && (
          <div
            id="send-error"
            role="alert"
            aria-live="polite"
            style={{
              position: "absolute",
              bottom: "80px",
              left: "20px",
              right: "20px",
              padding: "8px",
              backgroundColor: "#e74c3c",
              color: "white",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          >
            Error sending message: {sendError}
          </div>
        )}

        <label htmlFor="message-input" style={{ display: "none" }}>
          Message to {conversation.recipientNickname}
        </label>
        <input
          id="message-input"
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !sendingMessage && newMessage.trim()) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          placeholder="Type a message..."
          disabled={sendingMessage}
          aria-label={`Type a message to ${conversation.recipientNickname}`}
          aria-describedby={sendError ? "send-error" : undefined}
          style={{
            flex: 1,
            padding: "12px 16px",
            border: "1px solid #e1e5e9",
            borderRadius: "20px",
            outline: "none",
            fontSize: "15px",
            backgroundColor: "#f8f9fa",
            opacity: sendingMessage ? 0.6 : 1,
            minHeight: "44px", // Better touch target for mobile
          }}
        />
        <button
          onClick={handleSendMessage}
          disabled={!newMessage.trim() || sendingMessage}
          aria-label="Send message"
          style={{
            padding: "12px 20px",
            backgroundColor:
              newMessage.trim() && !sendingMessage ? "#0084ff" : "#e4e6ea",
            color: newMessage.trim() && !sendingMessage ? "white" : "#bcc0c4",
            border: "none",
            borderRadius: "20px",
            cursor:
              newMessage.trim() && !sendingMessage ? "pointer" : "not-allowed",
            fontSize: "14px",
            fontWeight: "600",
            transition: "background-color 0.2s ease",
            minHeight: "44px", // Better touch target for mobile
            minWidth: "60px",
          }}
        >
          {sendingMessage ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}
