import { getLoggedUserId } from '../../utils/getLoggedUserId';
import { useFetchConversationsOfUser } from '../../utils/requests';
import ItemConversation from '../ItemConversation';
import { css } from '@emotion/css';

const titleStyles = css`
  text-align: center;
`

const listStyles = css`
  max-width: 1080px;
  margin: auto;
`

const itemStyles = css`
  list-style-type: none;
  margin-bottom: 20px;
`

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
    <>
      <h2 className={titleStyles}>Your conversations</h2>
      <ul className={listStyles}>
        {conversations.map(conversation => (
          <li className={itemStyles}>
            <ItemConversation conversation={conversation} key={conversation.id} />
          </li>
        ))}
      </ul>
    </>
  )
}

export default ListConversations;