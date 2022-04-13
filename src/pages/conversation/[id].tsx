import ConversationDetail from "../../components/ConversationDetail";
import { fetchConversations } from "../../utils/requests";
import { getLoggedUserId } from "../../utils/getLoggedUserId";
import { Conversation } from "../../types/conversation";
import ConversationHeader from "../../components/ConversationHeader";

interface ConversationPageProps {
  conversation: Conversation | null;
}

const ConversationPage = ({ conversation }: ConversationPageProps) => {
  if (!conversation) {
    return (
      <p>No conversation</p>
    )
  }

  return (
    <div>
      <ConversationHeader conversation={conversation} />
      <ConversationDetail conversation={conversation} />
    </div>
  )
}

export async function getServerSideProps(context) {
  const conversationId = parseInt(context.params.id);

  // We supposed that we get the id from the token (jwt) for example
  const userId = getLoggedUserId();
  const conversationsOfUser = await fetchConversations(userId);

  // Workaround, because we don't have a route that return the detail of specific conversation
  // So we fetch all conversation of user and manually find the specific one
  const conversation = conversationsOfUser.find(conversation => conversation.id === conversationId);

  return { props: { conversation: conversation || null } }
}

export default ConversationPage;