import { AuthProvider } from 'react-admin';
import { createContext, FC, useContext } from 'react';

const AuthContext = createContext<AuthProvider>({} as AuthProvider);

export interface AuthContextProps {
  children: React.ReactNode;
}

export const ReactAdminAuthProvider: FC<AuthContextProps> = ({ children }) => {

  const authProvider: AuthProvider = {
    async login () {

    },
    async checkAuth () {

    },
    async handleCallback () {

    },
    async logout () {

    },
    async checkError () {

    }
  };

  return <AuthContext.Provider value={authProvider}>{children}</AuthContext.Provider>
};

export const useAuth = () => useContext(AuthContext);
