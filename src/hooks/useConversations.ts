import { useState, useEffect } from 'react'
import { fetchConversationsByUserId } from '../services/conversations/api';
import { Conversation } from '../types/conversation';

export const useConversations = (userId: number) => {
    const [fetching, setFetching] = useState<boolean>(false);
    const [conversations, setConversations] = useState<Conversation[]>([]);

    const getConversations = async (userId: number) => {
        setFetching(true)
        const conversations = await fetchConversationsByUserId(userId)
        setConversations(conversations)
        setFetching(false)
    }

    useEffect(()=> {
        getConversations(userId)
    }, [userId])

    return {
        fetching,
        conversations
    }
}
