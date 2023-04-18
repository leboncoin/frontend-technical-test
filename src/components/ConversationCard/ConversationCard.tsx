import DeleteIcon from "@mui/icons-material/Delete";

import Card from "@Components/Card";
import Box from "@Components/Box";
import CardContent from "@Components/CardContent";
import CardMedia from "@Components/CardMedia";
import IconButton from "@Components/IconButton";
import Typography from "@Components/Typography";
import { CardActions } from "@mui/material";

interface IConversationCardProps {
  id: number;
  recipientNickname: string;
  senderNickname: string;
  lastMessageTimestamp: string;
  onCardClick: (id: number) => void;
}
export const ConversationCard: React.FC<IConversationCardProps> = ({
  id,
  recipientNickname,
  senderNickname,
  lastMessageTimestamp,
  onCardClick,
}) => {
  const handleCardClick = () => onCardClick(id);

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        boxSizing: "borderBox",
        display: "flex",
        borderBottom: "1px solid",
        borderColor: "grey.200",
        boxShadow: "none",
        borderRadius: "none",
        p: 2,
        height: "104px",
        cursor: "pointer",
        "&:last-child": {
          border: "none",
        },
        "&:hover": {
          backgroundColor: "grey.200",
        },
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 50, height: 50, borderRadius: "50%" }}
        image={`https://i.pravatar.cc/50?img=${id}`}
        alt={`randomn picsum ${id}`}
      />
      <Box sx={{ display: "flex", flexDirection: "row", flex: "1" }}>
        <Box
          sx={{
            flex: "10",
          }}
        >
          <CardContent
            sx={{ padding: "0 0 0 1rem", paddingBottom: "0!important" }}
          >
            <Typography component="div" variant="h5">
              {recipientNickname}
            </Typography>
          </CardContent>
          <CardContent
            sx={{ padding: "0 0 0 1rem", paddingBottom: "0!important" }}
          >
            <Typography component="p" variant="body2" noWrap>
              orem ipsum dolor sit amet, consectetur adipiscing elit.
            </Typography>
          </CardContent>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <CardContent sx={{ padding: "0 1rem" }}>
            <Typography
              component="div"
              variant="caption"
              sx={{ color: "grey.500", textAlign: "right" }}
            >
              {lastMessageTimestamp}
            </Typography>
            <CardActions sx={{ justifyContent: "center" }}>
              <IconButton>
                <DeleteIcon
                  sx={{
                    "&:hover": {
                      color: "error.main",
                    },
                  }}
                />
              </IconButton>
            </CardActions>
          </CardContent>
        </Box>
      </Box>
    </Card>
  );
};
