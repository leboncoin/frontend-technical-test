import { getLoggedUserId } from "../../utils/getLoggedUserId";
import { useFetchUserInformation } from "../../utils/requests";

const HelloUser = () => {
  const userId = getLoggedUserId();
  const { data: user, error } = useFetchUserInformation(userId);

  if (error) {
    return (
      <p>Error when fetching user informations</p>
    )
  }

  if (!user) {
    return <p>Loading...</p>
  }

  return (
    <p>Hello {user.nickname}</p>
  )
}

export default HelloUser;