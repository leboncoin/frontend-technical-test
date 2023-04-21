import Box from "@Components/Box";
import Avatar, { stringAvatar } from "@Components/Avatar";
import Typography from "@Components/Typography";

interface MessageProps {
  children: React.ReactNode;
  color: "primary" | "secondary";
  author: string;
  timestamp: string;
  align: "start" | "end";
}
export const Message: React.FC<MessageProps> = ({
  children,
  author,
  color,
  timestamp,
  align,
}) => (
  <Box sx={{ display: "flex", mb: 1, p: 1, justifyContent: align }}>
    {align === "start" && <Avatar {...stringAvatar(author, { mr: 1 })} />}
    <Box
      sx={{
        display: "flex",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography
          sx={{
            backgroundColor: `${color}.light`,
            borderRadius: 3,
            p: 2,
            mb: 0.5,
            color: "common.white",
          }}
        >
          {children}
        </Typography>
        {timestamp && (
          <Typography
            paragraph
            variant="caption"
            textAlign={align === "start" ? "left" : "right"}
            sx={{ width: "100%", mb: 0 }}
          >
            {timestamp}
          </Typography>
        )}
      </Box>
    </Box>
  </Box>
);
