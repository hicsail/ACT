import { createContext, FC, ReactNode } from 'react';
import { client } from '../client/client.gen';
import { config } from '../config/configuration';
import { TOKEN_KEY } from './User.context';

const ClientContext = createContext({} as typeof client);

export interface ClientProviderProps {
  children: ReactNode;
}

export const ClientProvider: FC<ClientProviderProps> = ({ children }) => {
  client.setConfig({
    baseUrl: config.backendURL,
    auth: () => localStorage.getItem(TOKEN_KEY) || ''
  });

  return <ClientContext.Provider value={client}>{children}</ClientContext.Provider>;
};
