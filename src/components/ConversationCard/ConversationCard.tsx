import DeleteIcon from "@mui/icons-material/Delete";

import Card from "@Components/Card";
import Box from "@Components/Box";
import CardContent from "@Components/CardContent";
import CardActions from "@Components/CardActions";
import IconButton from "@Components/IconButton";
import Typography from "@Components/Typography";
import Avatar, { stringAvatar } from "@Components/Avatar";

interface IConversationCardProps {
  id: number;
  nickname: string;
  messageTimestamp: string;
  isSelected: boolean;
  onCardClick: (id: number) => void;
  onDeleteClick: (id: number) => void;
}
export const ConversationCard: React.FC<IConversationCardProps> = ({
  id,
  nickname,
  messageTimestamp,
  isSelected,
  onCardClick,
  onDeleteClick,
}) => {
  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCardClick(id);
  };
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDeleteClick(id);
  };

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        boxSizing: "borderBox",
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid",
        borderColor: "grey.200",
        backgroundColor: isSelected ? "grey.200" : "none",
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
      <CardContent>
        <Avatar {...stringAvatar(nickname)} />
      </CardContent>
      <Box sx={{ display: "flex", justifyContent: "space-between", flex: "1" }}>
        <CardContent
          sx={{ padding: "0 0 0 1rem", paddingBottom: "0!important" }}
        >
          <Typography component="div" variant="h5">
            {nickname}
          </Typography>
          <Typography
            component="div"
            variant="caption"
            sx={{ color: "grey.500" }}
          >
            {messageTimestamp || "0 message"}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "end" }}>
          <IconButton onClick={handleDeleteClick}>
            <DeleteIcon
              sx={{
                "&:hover": {
                  color: "error.main",
                },
              }}
            />
          </IconButton>
        </CardActions>
      </Box>
    </Card>
  );
};
