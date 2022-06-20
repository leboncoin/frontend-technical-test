import { Message as MessageType } from "../types/message";

export const useMessage = () => {
    
    const getMessages = (conversationId:number) : Promise<MessageType[]> => {     
        return fetch(`${process.env.NEXT_API_BASE_URL}/messages/${conversationId}`)
                .then(response => response.json())
                .then(data => data)
    }

    const postMessage = (message:string,conversationId:number) => {
        let postData = {
            body:message,
            timestamp : Date.now()
        }
        return fetch(`${process.env.NEXT_API_BASE_URL}/messages/${conversationId}`,
        {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
        .then(response => response.json())
        .then(data => data)
    }

    return {
        getMessages,
        postMessage
    }
}