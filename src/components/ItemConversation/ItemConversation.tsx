import Link from 'next/link';
import { css } from '@emotion/css'
import { Conversation } from "../../types/conversation";
import { formatDateByMonthAndDay, getDateFromTimestamp } from '../../utils/date';
import { getInterlocutorNameOfConversation } from '../../utils/conversations';

interface ItemConversationProps {
  conversation: Conversation;
}

const rootStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  border: 1px solid #e3e3e3;
  border-radius: 10px;
  padding: 10px 20px;
`

const badgeRootStyles = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`
const badgeStyles = css`
  border-radius: 50%;
  padding: 20px;
  display: inline-block;
  color: #fff;
`
const informationRootStyles = css`
  flex: 10;
`
const interlocutorStyles = css`
  font-weight: 700;
`

const getRandomColor = () => Math.floor(Math.random() * 16777215).toString(16);

const Badge = ({ name }) => {
  const randomColor = getRandomColor();

  return (
    <div className={badgeStyles} style={{ backgroundColor: `#${randomColor}` }}>
      <span>{name.slice(0, 1)}</span>
    </div>
  )
}

const ItemConversation = ({ conversation }: ItemConversationProps) => {
  const formattedDate = formatDateByMonthAndDay(getDateFromTimestamp(conversation.lastMessageTimestamp))
  const interlocutorName = getInterlocutorNameOfConversation(conversation);

  return (
    <Link href={`/conversation/${conversation.id}`}>
      <a>
        <div className={rootStyles}>
          <div className={badgeRootStyles}>
            <Badge name={interlocutorName} />
          </div>
          <div className={informationRootStyles}>
            <p className={interlocutorStyles}>{interlocutorName}</p>
            <p>{formattedDate}</p>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default ItemConversation;