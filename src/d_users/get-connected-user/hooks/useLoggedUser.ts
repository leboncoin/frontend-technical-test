import { loggedUser } from '@/d_users/get-connected-user/tests/fixtures';

// Default way to use a logged user
// Feel free to update the user ID for your tests
// or enhance it with better data source, or better user management
const useLoggedUser = () => {
    return { loggedUser };
};

export default useLoggedUser;
