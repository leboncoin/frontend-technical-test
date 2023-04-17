import { NextPage } from "next";

import { getLoggedUserId } from '../../utils/getLoggedUserId'

const ConversationsPage : NextPage = () => <div >Conversation</div>

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