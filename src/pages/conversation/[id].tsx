import ConversationDetail from "../../components/ConversationDetail";
import { fetchConversations } from "../../utils/requests";
import { getLoggedUserId } from "../../utils/getLoggedUserId";
import { Conversation } from "../../types/conversation";
import ConversationHeader from "../../components/ConversationHeader";
import { css } from "@emotion/css";
import SendMessageForm from "../../components/SendMessageForm";

interface ConversationPageProps {
  conversation: Conversation | null;
}

const rootStyles = css`
  display: grid;
  grid-template:
    "conversationHeader" min-content
    "conversationDetail"
    "sendMessageForm" min-content;
  min-height: 100vh;
  max-width: 1080px;
  margin: auto;
`

const convertionHeaderStyles = css`
  grid-area: conversationHeader;
`
const convertionDetaiStyles = css`
  grid-area: conversationDetail;
  max-width: 480px;
  margin-left: auto; 
  margin-right: 0;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`
const sendMessageFormrStyles = css`
  grid-area: sendMessageForm;
`

const ConversationPage = ({ conversation }: ConversationPageProps) => {
  if (!conversation) {
    return (
      <p>No conversation</p>
    )
  }

  return (
    <div className={rootStyles}>
      <div className={convertionHeaderStyles}>
        <ConversationHeader conversation={conversation} />
      </div>
      <div className={convertionDetaiStyles}>
        <ConversationDetail conversation={conversation} />
      </div>
      <div className={sendMessageFormrStyles}>
        <SendMessageForm />
      </div>
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