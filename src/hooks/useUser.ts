import head from 'lodash/head';
import { useState, useEffect } from 'react'
import { fetchUserById } from '../services/users/api';
import { User } from '../types/user';

export const useUser = (userId: number) => {
    const [fetching, setFetching] = useState<boolean>(false);
    const [user, setUser] = useState<User>(null);

    const getUser = async (userId: number) => {
        setFetching(true)
        const user = await fetchUserById(userId)
        setUser(
            head(user)
        )
        setFetching(false)
    }

    useEffect(()=> {
        getUser(userId)
    }, [userId])

    return {
        fetching,
        user,
    }
}
