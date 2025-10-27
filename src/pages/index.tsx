import type { ReactElement } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import type { Conversation } from "../types/conversation";
import Logo from "../assets/lbc-logo.webp";

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

export default function Home(): ReactElement {
  const router = useRouter();

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

      <div
        style={{
          backgroundColor: "white",
          borderBottom: "1px solid #e1e5e9",
          padding: "20px 24px",
          boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
          }}
        >
          <Image
            src={Logo}
            alt="Leboncoin Frontend Team"
            width={200}
            height={62}
            priority
          />
        </div>
        <h1
          style={{
            margin: "16px 0 0 0",
            fontSize: "24px",
            fontWeight: "600",
            color: "#1c1e21",
            textAlign: "center",
          }}
        >
          Conversations
        </h1>
      </div>

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
        {MOCK_CONVERSATIONS.map((conversation, index) => (
          <div
            key={conversation.id}
            onClick={() => handleConversationClick(conversation)}
            style={{
              padding: "16px 20px",
              borderBottom:
                index < MOCK_CONVERSATIONS.length - 1
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
