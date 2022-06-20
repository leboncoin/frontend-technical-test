import { User } from '../types/user'

export const useUser = () => {
    
    const getUser = async (userId:number) : Promise<User> => {        
        return fetch(`${process.env.NEXT_API_BASE_URL}/user/${userId}`)
                .then(response => response.json())
                .then(data => data[0])
    }

    return { getUser }
}