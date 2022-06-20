import { useState, useEffect } from "react"

export const useConversation = (userId:number) => {
    
    const [conversations,setConversations] = useState([]);

    useEffect(()=> {
        getConversations(userId);
    },[userId])

    const getConversations = (userId:number) => {
        
        fetch(`${process.env.NEXT_API_BASE_URL}/conversations/${userId}`)
                .then(response => response.json())
                .then(data => setConversations(data))
    }

    return { conversations }
}

