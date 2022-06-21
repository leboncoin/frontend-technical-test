import { Message as MessageType } from "../types/message";
import axios from 'axios'

export const useMessage = () => {
    
    const getMessages = (conversationId:number) : Promise<MessageType[]> => {
        return axios.get(`/messages/${conversationId}`)
            .then(response => response.data)
    }

    const postMessage = (message:string,conversationId:number) => {
        let postData = {
            body:message,
            timestamp : Date.now()
        }
        return axios.post(`/messages/${conversationId}`,postData)
        .then(response => response.data)
    }

    return {
        getMessages,
        postMessage
    }
}