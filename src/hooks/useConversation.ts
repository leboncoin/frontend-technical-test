import { useState, useEffect } from "react"
import axios from 'axios'

export const useConversation = (userId:number) => {
    
    const [conversations,setConversations] = useState([]);

    useEffect(()=> {
        getConversations(userId);
    },[userId])

    const getConversations = (userId:number) => {

        axios.get(`/conversations/${userId}`).then(response => setConversations(response.data))
    }

    return { conversations }
}

