import { createContext, FC, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export const TOKEN_KEY = 'CASDOOR_JWT';

const parseJwt = (token: string) => {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
};

export interface UserInfo {
  token: string;
  id: string;
}

export interface UserContextPayload {
  user?: UserInfo;
  login: (token: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextPayload>({} as UserContextPayload);

export interface UserProviderProps {
  children: React.ReactNode;
}

const hasJWTExpired = (token: string): boolean => {
  const expiry = JSON.parse(window.atob(token.split('.')[1])).exp;
  return Math.floor(new Date().getTime() / 1000) >= expiry;
};

export const UserContextProvider: FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserInfo | undefined>(undefined);
  const navigate = useNavigate();

  // Handle if an existing JWT is found
  useEffect(() => {
    const existingToken = localStorage.getItem(TOKEN_KEY);
    if (existingToken && !hasJWTExpired(existingToken)) {
      const user = parseJwt(existingToken);
      setUser({ token: existingToken, id: user.id });
    } else {
      setUser(undefined);
    }
  }, []);

  const handleLogin = (token: string) => {
    const user = parseJwt(token);
    setUser({ token, id: user.id });
    localStorage.setItem(TOKEN_KEY, token);
  };

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(undefined);
    navigate('/');
  };

  return <UserContext.Provider value={{ user, login: handleLogin, logout: handleLogout }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
