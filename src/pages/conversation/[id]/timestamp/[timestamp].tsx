import type { FC } from 'react'
import { MessageComponent } from '../../../../components/message'
import { getLoggedUserId } from '../../../../utils/getLoggedUserId'
const loggedUserId = getLoggedUserId() ;

interface conversationProps {
    conversationId: number
	lastMessageTimestamp:number
}

const Conversation: FC<conversationProps> = ({conversationId,lastMessageTimestamp}) => {
	console.log(lastMessageTimestamp);
  return (
    <div>
      <MessageComponent conversationId={conversationId} loggedUserId={loggedUserId} lastMessageTimestamp={lastMessageTimestamp}/>
    </div>
  )
}

export const getStaticProps = async ({ params }) => {
	return {
		props: {
			conversationId: params.id,
			lastMessageTimestamp : params.timestamp
		},
	}
}


export const getStaticPaths = async () => {
	return {
		paths: [],
		fallback: 'blocking',
	}
}

export default Conversation