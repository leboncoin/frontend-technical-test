import Link from 'next/link';
import { Conversation } from "../../types/conversation";
import { formatDateByMonthAndDay, getDateFromTimestamp } from '../../utils/date';
import { getInterlocutorNameOfConversation } from '../../utils/conversations';

interface ItemConversationProps {
  conversation: Conversation;
}


const ItemConversation = ({ conversation }: ItemConversationProps) => {
  const formattedDate = formatDateByMonthAndDay(getDateFromTimestamp(conversation.lastMessageTimestamp))
  const interlocutorName = getInterlocutorNameOfConversation(conversation);

  return (
    <Link href={`/conversation/${conversation.id}`}>
      <a>
        <p>{interlocutorName}</p>
        <p>{formattedDate}</p>
      </a>
    </Link>
  )
}

export default ItemConversation;