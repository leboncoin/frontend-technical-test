import type { ReactElement } from "react";
import Image from "next/image";
import Logo from "../assets/lbc-logo.webp";

interface HeaderProps {
  title?: string;
  showTitle?: boolean;
}

export default function Header({
  title,
  showTitle = false,
}: HeaderProps): ReactElement {
  return (
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
      {showTitle && title && (
        <h1
          style={{
            margin: "16px 0 0 0",
            fontSize: "24px",
            fontWeight: "600",
            color: "#1c1e21",
            textAlign: "center",
          }}
        >
          {title}
        </h1>
      )}
    </div>
  );
}
