import { FormattedMessage } from "../../types/message";

interface ItemMessageProps {
  message: FormattedMessage
}

const ItemMessage = ({ message }: ItemMessageProps) => {
  return (
    <div>
      {!message.isMyself && (
        <p>{message.authorName}</p>
      )}
      <p>{message.body}</p>
    </div>
  )
}

export default ItemMessage;