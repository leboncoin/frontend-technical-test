import React, { createContext, useContext } from "react";

import { getLoggedUserId } from "@Utils/getLoggedUserId";

const loggedUserId = getLoggedUserId();

const UserIdContext = createContext(loggedUserId);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <UserIdContext.Provider value={loggedUserId}>
    {children}
  </UserIdContext.Provider>
);

export const useUserId = () => {
  const context = useContext(UserIdContext);
  if (context === undefined)
    throw new Error("useUser must be used within a UserProvider");
  return context;
};
