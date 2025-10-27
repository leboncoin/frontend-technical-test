import type { ReactElement } from "react";

interface AvatarProps {
  name: string;
  size?: number;
}

export default function Avatar({ name, size = 48 }: AvatarProps): ReactElement {
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

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        backgroundColor: getAvatarColor(name),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: "600",
        fontSize: `${Math.round(size * 0.375)}px`,
        flexShrink: 0,
      }}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
}
