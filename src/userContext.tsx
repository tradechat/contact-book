import React, { createContext, useContext, useState, ReactNode } from "react";
import { UserType } from "./models/userType";

interface UserContextProps {
  userType: UserType;
  setUserType: (type: UserType) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userType, setUserType] = useState<UserType>(UserType.ADMIN);

  return (
    <UserContext.Provider value={{ userType, setUserType }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
