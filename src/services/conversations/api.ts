import { BASE_URL } from '../../utils/constants'

export const fetchConversationsByUserId = async (id: number) => {
    return await fetch(`${BASE_URL}/conversations/${id}`)
        .then(data => data.json())
}
