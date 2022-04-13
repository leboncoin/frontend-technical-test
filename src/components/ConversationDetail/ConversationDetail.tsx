import { Conversation } from "../../types/conversation";
import { useFetchMessagesOfConversation } from "../../utils/requests";
import { getLoggedUserId } from "../../utils/getLoggedUserId";
import ItemMessage from "../ItemMessage";

interface ConversationProps {
  conversation: Conversation;
}

const ConversationDetail = ({ conversation }: ConversationProps) => {
  const userId = getLoggedUserId();
  const { data: messages, error } = useFetchMessagesOfConversation(conversation.id)

  if (error) {
    return (
      <p>Error when loading messages</p>
    )
  }

  if (!messages) {
    return (
      <p>Loading messages...</p>
    )
  }

  const formattedMessages = messages.map(message => ({
    ...message,
    authorName: message.authorId === conversation.recipientId ? conversation.recipientNickname : conversation.senderNickname,
    isMyself: message.authorId === userId,
  }))

  return (
    <div>
      {formattedMessages.map(message => (
        <ItemMessage message={message} key={message.id} />
      ))}
    </div>
  )
}

export default ConversationDetail;