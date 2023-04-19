import AppBar from "@Components/AppBar";
import Box from "@Components/Box";
import Button from "@Components/Button";
import Toolbar from "@Components/Toolbar";
import Typography from "@Components/Typography";

interface Message {
  id: number;
  conversationId: number;
  timestamp: number;
  authorId: number;
  body: string;
}
interface ChatProps {
  messages: Message[];
}

export const Chat: React.FC<ChatProps> = ({ messages }) => {
  const sendMessage = async () => {
    const messageBody = { body: "test message", timestamp: Date.now() };
    return await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/messages/1`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageBody),
    });
  };
  return (
    <Box>
      <AppBar color="primary" position="static" sx={{ width: "100%" }}>
        <Toolbar></Toolbar>
      </AppBar>
      <Box>
        {messages.map(({ id, conversationId, timestamp, authorId, body }) => (
          <Typography key={id}>{body}</Typography>
        ))}
      </Box>

      <Button color="primary" variant="contained" onClick={sendMessage}>
        Envoyer
      </Button>
    </Box>
  );
};
