import React, { createContext, useContext, useState } from "react";

const NotificationContext = createContext([]);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <NotificationContext.Provider value={[open, setOpen]}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined)
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  return context;
};
