import { useContext } from 'react';

import { UserContext } from '@/d_users/shared/context/UserContext';

export const useUsers = () => {
    const context = useContext(UserContext);

    if (context === undefined) {
        throw new Error('useUsers is to be used in UserContext');
    }

    return context;
};

export default useUsers;
