import { createContext, FC, useContext } from "react";
import Sdk from "casdoor-js-sdk";
import { config } from "../config/configuration";

const CasdoorContext = createContext<Sdk>({} as Sdk);

export interface CasdoorProviderProps {
  children: React.ReactNode;
}

export const CasdoorProvider: FC<CasdoorProviderProps> = ({ children }) => {
  const CasdoorSDK = new Sdk({
    ...config.casdoor,
  });

  return (
    <CasdoorContext.Provider value={CasdoorSDK}>
      {children}
    </CasdoorContext.Provider>
  );
};

export const useCasdoor = () => useContext(CasdoorContext);
