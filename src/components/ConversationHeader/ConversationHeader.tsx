import { Conversation } from "../../types/conversation";
import { getInterlocutorNameOfConversation } from "../../utils/conversations";
import { getDateFromTimestamp, formatDateByMonthDayAndHour } from "../../utils/date";
import { css } from "@emotion/css";
import Link from "next/link";

interface ConversationHeaderProps {
  conversation: Conversation
}

const backButtonStyles = css`
  border: 1px solid #000;
  font-size: 10px;
  padding: 5px;
`

const BackButton = () => {
  return (
    <Link href="/">
      <a className={backButtonStyles}>Back</a>
    </Link>
  )
}

const rootStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #e3e3e3;
  border-top: 3px solid #000;
`

const namesStyles = css`
  font-weight: 700;
`
const lastMessageDateStyles = css`
  font-weight: 700;
  @media (max-width: 600px) {
    display: none;
  }
`

const ConversationHeader = ({ conversation }: ConversationHeaderProps) => {
  const interlocutorName = getInterlocutorNameOfConversation(conversation);
  const formattedLastMessageDate = formatDateByMonthDayAndHour(getDateFromTimestamp(conversation.lastMessageTimestamp))

  return (
    <div className={rootStyles}>
      <p className={namesStyles}>{interlocutorName} - You <BackButton /></p>
      <p className={lastMessageDateStyles}>Last message {formattedLastMessageDate}</p>
    </div>
  )
}

export default ConversationHeader;
