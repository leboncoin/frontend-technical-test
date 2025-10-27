import type { ReactElement } from "react";

/**
 * Utility for handling API errors gracefully
 * "Our infrastructure is a bit shaky.. Sometimes the servers are crashing"
 */

export interface ErrorInfo {
  message: string;
  type: "network" | "server" | "unknown";
  recoverable: boolean;
}

const errorMessages = {
  network: "Oops! Your internet went shopping for croissants 🥐",
  server: "Our servers are sipping café au lait ☕",
  client: "That request got lost in a Parisian metro 🚇",
  generic: "Ooh là là! Something unexpected happened 💫",
};

function getRandomMessage(messages: string[]): string {
  return messages[Math.floor(Math.random() * messages.length)];
}

export function parseError(error: any): ErrorInfo {
  if (error?.message?.includes("fetch") || error?.name === "TypeError") {
    return {
      message: errorMessages.network,
      type: "network",
      recoverable: true,
    };
  }

  if (
    error?.message?.includes("500") ||
    error?.message?.includes("Internal Server Error")
  ) {
    return {
      message: errorMessages.server,
      type: "server",
      recoverable: true,
    };
  }

  if (error?.message?.includes("400") || error?.message?.includes("404")) {
    return {
      message: errorMessages.client,
      type: "unknown",
      recoverable: false,
    };
  }

  return {
    message: errorMessages.generic,
    type: "unknown",
    recoverable: true,
  };
}

interface ErrorDisplayProps {
  error: string | ErrorInfo;
  onRetry?: () => void;
}

const errorEmojis = {
  network: "🥐",
  server: "☕",
  unknown: "🤷‍♂️",
};

export function ErrorDisplay({
  error,
  onRetry,
}: ErrorDisplayProps): ReactElement {
  const errorInfo =
    typeof error === "string" ? parseError({ message: error }) : error;

  const getEmoji = (type: string) => {
    return errorEmojis[type as keyof typeof errorEmojis] || errorEmojis.unknown;
  };

  return (
    <div
      style={{
        padding: "40px 20px",
        textAlign: "center",
        backgroundColor: "#fdf2f2",
        borderRadius: "8px",
        margin: "16px",
        border: "1px solid #fecaca",
      }}
    >
      <div style={{ fontSize: "32px", marginBottom: "12px" }}>
        {getEmoji(errorInfo.type)}
      </div>

      <h3
        style={{
          margin: "0 0 8px 0",
          color: "#2d3748",
          fontSize: "18px",
          fontWeight: "600",
        }}
      >
        Oops!
      </h3>

      <p
        style={{
          margin: "0 0 16px 0",
          color: "#4a5568",
          fontSize: "14px",
          lineHeight: "1.4",
        }}
      >
        {errorInfo.message}
      </p>

      {errorInfo.recoverable && onRetry && (
        <button
          onClick={onRetry}
          style={{
            backgroundColor: "#0084ff",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          🔄 Try Again
        </button>
      )}

      {!errorInfo.recoverable && (
        <p
          style={{
            fontSize: "12px",
            color: "#a0aec0",
            fontStyle: "italic",
            margin: "8px 0 0 0",
          }}
        >
          💡 Try refreshing the page?
        </p>
      )}
    </div>
  );
}
