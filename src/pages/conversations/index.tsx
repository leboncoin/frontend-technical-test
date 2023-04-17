import { NextPage } from "next";

import { getLoggedUserId } from '../../utils/getLoggedUserId'

import ConversationCard from '../../components/ConversationCard/'

interface IConversation {
    id: number;
    recipientId: number;
    recipientNickname: string;
    senderId: number;
    senderNickname: string;
    lastMessageTimestamp: number;
}



const ConversationsPage : NextPage<{ conversations: IConversation[]}> = ({conversations}) => 
    (<section>
        <h1 >Conversations</h1>
        <section>
            {conversations.map(({id, recipientId, recipientNickname, senderId, senderNickname, lastMessageTimestamp}) => (<ConversationCard key={id} id={id} recipientNickname={recipientNickname} senderNickname={senderNickname}/>))}
        </section>
    </section>)

export default ConversationsPage

export async function getStaticProps() {
    const loggedUserId = getLoggedUserId()

    const res = await fetch(`http://localhost:3005/conversations/${loggedUserId}`)
    const conversations = await res.json()

    console.log('conversations', conversations)

    return {
        props: {
            conversations
        },
      }
}