import { Conversation } from "../../types/conversation";
import { getInterlocutorNameOfConversation } from "../../utils/conversations";
import { getDateFromTimestamp, formatDateByMonthDayAndHour } from "../../utils/date";

interface ConversationHeaderProps {
  conversation: Conversation
}

const ConversationHeader = ({ conversation }: ConversationHeaderProps) => {
  const interlocutorName = getInterlocutorNameOfConversation(conversation);
  const formattedLastMessageDate = formatDateByMonthDayAndHour(getDateFromTimestamp(conversation.lastMessageTimestamp))

  return (
    <h1>
      {interlocutorName} - You
      <span>Last message {formattedLastMessageDate}</span>
    </h1>
  )
}

export default ConversationHeader;
