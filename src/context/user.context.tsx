
import { getLoggedUserId } from '@/utils/getLoggedUserId';
import { createContext } from 'react';

interface UserProviderProps {
  children: JSX.Element;
}
const UserContext = createContext<number | null>(null);
 const UserProvider = ({children}: UserProviderProps) => {
    
    return (
        <UserContext.Provider value={getLoggedUserId()}>{children}</UserContext.Provider>
    )
}

export  {UserProvider, UserContext }