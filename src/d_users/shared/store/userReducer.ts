import type { User } from '../types/User';

export enum UserActionType {
    GET_ALL = 'GET_USERS',
}

interface UserState {
    users: User[];
}

interface UserAction {
    type: UserActionType;
    payload: User[];
}

export const initialState = {
    users: [],
};

const userReducer = (state: UserState, action: UserAction) => {
    const { type, payload } = action;

    switch (type) {
        case UserActionType.GET_ALL:
            return {
                ...state,
                users: payload as User[],
            };
        default:
            throw new Error(`No case for type ${type} in userReducer.`);
    }
};

export default userReducer;
