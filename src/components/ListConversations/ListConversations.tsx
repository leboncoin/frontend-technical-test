import { getLoggedUserId } from '../../utils/getLoggedUserId';
import { useFetchConversationsOfUser } from '../../utils/requests';
import ItemConversation from '../ItemConversation';

const ListConversations = () => {
  const userId = getLoggedUserId();
  const { data: conversations, error } = useFetchConversationsOfUser(userId);

  if (error) {
    return (
      <p>
        Error when fetching conversations
      </p>
    )
  }

  if (!conversations) {
    return (
      <p>Loading conversations...</p>
    )
  }

  return (
    <div>
      {conversations.map(conversation => (
        <ItemConversation conversation={conversation} key={conversation.id} />
      ))}
    </div>
  )
}

export default ListConversations;