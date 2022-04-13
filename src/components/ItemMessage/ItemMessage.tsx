import { FormattedMessage } from "../../types/message";
import { css } from "@emotion/css";
import clsx from 'clsx';

interface ItemMessageProps {
  message: FormattedMessage
}

const bodyMessageStyles = css`
  background-color: #e3e3e3;
  border-radius: 25px;
  padding: 15px 20px;
  max-width: 75%;
`

const bodyMyselfMessageStyles = css`
  background-color: #2096f3;
  color: #fff;
  margin-left: auto; 
  margin-right: 0;
`

const authorNameStyles = css`
  color: #a1a1a1;
`

const ItemMessage = ({ message }: ItemMessageProps) => {
  return (
    <div>
      {!message.isMyself && (
        <p className={authorNameStyles}>{message.authorName}</p>
      )}
      <p className={clsx(bodyMessageStyles, message.isMyself && bodyMyselfMessageStyles)}>{message.body}</p>
    </div>
  )
}

export default ItemMessage;