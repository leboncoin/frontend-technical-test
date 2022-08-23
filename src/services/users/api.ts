import { BASE_URL } from '../../utils/constants'

export const fetchUsers = async () => {
    return await fetch(`${BASE_URL}/users`)
        .then(data => data.json())
}

export const fetchUserById = async (id: number) => {
    return await fetch(`${BASE_URL}/user/${id}`)
        .then(data => data.json())
}
