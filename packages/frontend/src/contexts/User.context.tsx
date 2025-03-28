import { createContext, FC, useContext, useEffect, useState } from "react";

export const TOKEN_KEY = "CASDOOR_JWT";

export interface UserInfo {
  token: string;
}

export interface UserContextPayload {
  user?: UserInfo;
  login: (token: string) => void;
}

const UserContext = createContext<UserContextPayload>({} as UserContextPayload);

export interface UserProviderProps {
  children: React.ReactNode;
}

const hasJWTExpired = (token: string): boolean => {
  const expiry = JSON.parse(window.atob(token.split(".")[1])).exp;
  return Math.floor(new Date().getTime() / 1000) >= expiry;
};

export const UserContextProvider: FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserInfo | undefined>(undefined);

  // Handle if an existing JWT is found
  useEffect(() => {
    const existingToken = localStorage.getItem(TOKEN_KEY);
    if (existingToken && !hasJWTExpired(existingToken)) {
      setUser({ token: existingToken });
    } else {
      setUser(undefined);
    }
  }, []);

  const handleLogin = (token: string) => {
    setUser({ token });
    localStorage.setItem(TOKEN_KEY, token);
  };

  return (
    <UserContext.Provider value={{ user, login: handleLogin }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
