import React from "react";
import type { Conversation } from "../types/conversation";

interface NewConversationButtonProps {
  conversations: Conversation[];
  onConversationCreated: () => void;
}

const NewConversationButton: React.FC<NewConversationButtonProps> = ({
  conversations,
  onConversationCreated,
}) => {
  const handleNewConversation = async () => {
    try {
      const recipientNickname = prompt(
        "Enter the recipient's nickname:"
      )?.trim();
      if (!recipientNickname) return;

      const loggedUserId = 1;
      const loggedUserNickname = "Thibaut";

      let recipient = null;
      let isNewUser = false;

      try {
        const usersResponse = await fetch("http://localhost:3005/users");
        if (usersResponse.ok) {
          const users = await usersResponse.json();
          recipient = users.find(
            (user: any) =>
              user.nickname.toLowerCase() === recipientNickname.toLowerCase()
          );
        }
      } catch (error) {
        console.warn("Could not fetch users, will create new user");
      }

      if (!recipient) {
        const createNew = confirm(
          `User "${recipientNickname}" doesn't exist yet. Do you want to create a new conversation with them?`
        );
        if (!createNew) return;
        try {
          const newUserResponse = await fetch("http://localhost:3005/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              nickname: recipientNickname,
              token: "xxxx",
            }),
          });

          if (newUserResponse.ok) {
            recipient = await newUserResponse.json();
            isNewUser = true;
          } else {
            throw new Error("Failed to create new user");
          }
        } catch (error) {
          alert("Error creating new user. Please try again.");
          return;
        }
      }

      if (recipient.id === loggedUserId) {
        alert("You cannot create a conversation with yourself!");
        return;
      }

      const existingConversation = conversations.find(
        (conv) =>
          (conv.senderId === loggedUserId &&
            conv.recipientId === recipient.id) ||
          (conv.senderId === recipient.id && conv.recipientId === loggedUserId)
      );

      if (existingConversation) {
        alert(`Conversation with ${recipient.nickname} already exists!`);
        return;
      }
      const response = await fetch("http://localhost:3005/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientId: recipient.id,
          recipientNickname: recipient.nickname,
          senderId: loggedUserId,
          senderNickname: loggedUserNickname,
          lastMessageTimestamp: Math.floor(Date.now() / 1000),
        }),
      });

      if (response.ok) {
        onConversationCreated();
        const message = isNewUser
          ? `New user "${recipientNickname}" created and conversation started!`
          : `New conversation with ${recipientNickname} created!`;
        alert(message);
      } else {
        throw new Error("Failed to create conversation");
      }
    } catch (error) {
      alert("Error creating conversation. Please try again.");
      console.error("Error creating conversation:", error);
    }
  };

  return (
    <button
      style={{
        width: "100%",
        padding: "16px",
        marginTop: "20px",
        backgroundColor: "#0084ff",
        color: "white",
        border: "none",
        borderRadius: "8px",
        fontSize: "16px",
        fontWeight: "600",
        cursor: "pointer",
        transition: "background-color 0.2s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0066cc")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0084ff")}
      onClick={handleNewConversation}
    >
      + New Conversation
    </button>
  );
};

export default NewConversationButton;
