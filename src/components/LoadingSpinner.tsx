import type { ReactElement } from "react";

interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({ message = "Loading..." }: LoadingSpinnerProps): ReactElement {
  return (
    <div
      style={{
        padding: "40px 20px",
        textAlign: "center",
        color: "#65676b",
      }}
    >
      <div
        style={{
          width: "20px",
          height: "20px",
          border: "2px solid #e1e5e9",
          borderTop: "2px solid #0084ff",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
          margin: "0 auto 16px auto",
        }}
      />
      <p>{message}</p>
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}