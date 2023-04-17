import Card from '../Card'
import Box from '../Box';
import CardContent from '../CardContent';
import CardMedia from '../CardMedia';
import IconButton from '../IconButton';
import Typography from '../Typography';

interface IConversationCardProps {
id: number
recipientNickname: string
senderNickname: string
}
export const ConversationCard: React.FC<IConversationCardProps> = ({id, recipientNickname, senderNickname}) => (<Card sx={{ display: 'flex' }}>
    <CardMedia
  component="img"
  sx={{ width: 150 }}
  image={`https://picsum.photos/id/${id}/200/`}
  alt={`randomn picsum ${id}`}
/>
<Box sx={{ display: 'flex', flexDirection: 'column' }}>
  <CardContent sx={{ flex: '1 0 auto' }}>
    <Typography component="div" variant="h5">
    {recipientNickname}
    </Typography>
    <Typography variant="subtitle1" color="text.secondary" component="div">
    {senderNickname}
    </Typography>
  </CardContent>
  <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
    <IconButton aria-label="delete">
      
    </IconButton>
    
  </Box>
</Box>

</Card>)