import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { UserType } from "./models/userType";
import { getCookie, setCookie } from "cookies-next";

interface UserContextProps {
  userType: UserType;
  setUserType: (type: UserType) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const role = getCookie("role");
  const [userType, setUserTypeState] = useState<UserType>(UserType.USER);

  useEffect(() => {
    if (role && Object.values(UserType).includes(role as UserType)) {
      setUserTypeState(role as UserType);
    }
  }, [role]);

  const setUserType = (type: UserType) => {
    setUserTypeState(type);
    setCookie("role", type);
  };

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
