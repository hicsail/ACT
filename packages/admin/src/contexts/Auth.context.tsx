import { AuthProvider as ReactAdminAuthProvider } from 'react-admin';
import { createContext, FC, useContext, useState, useEffect } from 'react';
import { config } from '../config/configuration';

export const TOKEN_KEY = 'CASDOOR_JWT_ADMIN';

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

const hasJWTExpired = (token: string): boolean => {
  const expiry = JSON.parse(window.atob(token.split('.')[1])).exp;
  return Math.floor(new Date().getTime() / 1000) >= expiry;
};

export interface UserInfo {
  token: string;
  id: string;
}

export interface AuthContextPayload {
  authProvider: ReactAdminAuthProvider | null;
  user: UserInfo | null;
}

const AuthContext = createContext<AuthContextPayload>({} as AuthContextPayload);

export interface AuthContextProps {
  children: React.ReactNode;
}

/**
 * Helper to get the React Admin Auth provider object.
 * Needed in the case that the login URL hasn't been
 * fetched yet in which case null is returned.
 */
const getReactAdminAuthProvider = (loginURL: string | null, user: UserInfo | null): ReactAdminAuthProvider | null => {
  // If the login URL isn't present, the auth provider cannot be made
  if (!loginURL) {
    return null;
  }

  return {
    async login () {

    },
    async checkAuth () {
      // Check if a user object is present, if it is, then the user
      // is already authenticated
      if (user) {
        return;
      }

      // Otherwise, redirect to the login URL
      window.location.href = loginURL;
    },
    async handleCallback () {

    },
    async logout () {

    },
    async checkError () {

    }
  };
};

export const AuthProvider: FC<AuthContextProps> = ({ children }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loginURL, setLoginURL] = useState<string | null>(null);

  // Handles getting the correct login URL for casdoor
  const getAuthURL = async () => {
    const result = await fetch(`${config.backendURL}/casdoor/redirect`);
    const body = await result.json();
    setLoginURL(body.url);
  };
  useEffect(() => {
    getAuthURL();
  }, []);

  // Handle if an existing JWT is found
  useEffect(() => {
    const existingToken = localStorage.getItem(TOKEN_KEY);
    if (existingToken && !hasJWTExpired(existingToken)) {
      const user = parseJwt(existingToken);
      setUser({ token: existingToken, id: user.id });
    } else {
      setUser(null);
    }
  }, []);

  const authProvider = getReactAdminAuthProvider(loginURL, user);

  return <AuthContext.Provider value={{authProvider, user}}>{children}</AuthContext.Provider>
};

export const useAuth = () => useContext(AuthContext);
