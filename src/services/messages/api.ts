import { MessageInputValues } from '../../types/message'
import { BASE_URL } from '../../utils/constants'

export const fetchMessagesByConversationId = async (id: number) => {
    return await fetch(`${BASE_URL}/messages/${id}`)
        .then(data => data.json())
}

export const postMessage = async (payload: MessageInputValues) => {
    const {
        conversationId,
    } = payload
    const timestamp = Date.now()
    return await fetch(`${BASE_URL}/messages/${conversationId}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...payload,
            timestamp,
        }),
    })
    .then(data => data.json())
}

