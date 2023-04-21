import { useQuery } from "react-query";

import { getMessagesByConversationId } from "@Api/messages";
import { getUsers } from "@Api/users";

import { formatTimestamp } from "@Utils/date";

import { useUserId } from "@Containers/User/user-context";

import AppBar from "@Components/AppBar";
import Box from "@Components/Box";
import Avatar, { stringAvatar } from "@Components/Avatar";
import Button from "@Components/Button";
import Toolbar from "@Components/Toolbar";
import Message from "@Components/Message";
import { getConversationsByUserId } from "@Api/conversations";

interface ChatProps {
  conversationId: number;
}

export const Chat: React.FC<ChatProps> = ({ conversationId }) => {
  const userId = useUserId();
  const { data: messages = [] } = useQuery(["messages", conversationId], () =>
    getMessagesByConversationId(conversationId)
  );
  const { data: users } = useQuery("users", getUsers);
  const { data: conversations } = useQuery("conversations", () =>
    getConversationsByUserId(userId)
  );
  const conversation = conversations.filter(
    ({ id }) => conversationId == id
  )[0];

  const nickname =
    conversation.recipientId !== userId
      ? conversation.recipientNickname
      : conversation.senderNickname;
  return (
    <Box>
      <AppBar color="primary" position="static" sx={{ width: "100%" }}>
        <Toolbar>
          <Avatar {...stringAvatar(nickname, { mr: 2 })} />
          {nickname}
        </Toolbar>
      </AppBar>
      <Box>
        {messages.map(({ id, timestamp, authorId, body }) => {
          const author = users.filter(({ id }) => authorId === id)[0].nickname;
          return (
            <Message
              key={id}
              author={author}
              color={authorId == userId ? "primary" : "secondary"}
              timestamp={formatTimestamp(timestamp)}
              align={authorId == userId ? "end" : "start"}
            >
              <>{body}</>
            </Message>
          );
        })}
      </Box>

      {/* <Button color="primary" variant="contained" onClick={sendMessage}>
        Envoyer
      </Button> */}
    </Box>
  );
};
