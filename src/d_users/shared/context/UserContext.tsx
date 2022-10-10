import { createContext, useReducer } from 'react';
import userReducer, { UserActionType, initialState } from '../store/userReducer';
import { User } from '../types/User';

type UserContextProps = {
    users: User[];
    getUsers?: (users: User[]) => void;
    sendUser?: (user: User) => void;
};

export const UserContext = createContext<UserContextProps>({
    users: initialState.users,
});

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    const getUsers = (users: User[]) => {
        dispatch({
            type: UserActionType.GET_ALL,
            payload: users,
        });
    };

    const value: UserContextProps = {
        users: state.users,
        getUsers,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
