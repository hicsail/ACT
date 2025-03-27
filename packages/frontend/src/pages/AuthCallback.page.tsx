import { FC } from 'react';
import { AuthCallback as Casdoor } from "casdoor-react-sdk";
import { CasdoorSDK } from '../services/casdoor.service';
import { config } from '../config/configuration';


export const AuthCallback: FC = () => {
  return (
    <Casdoor
      sdk={CasdoorSDK}
      serverUrl={config.backendURL}
      saveTokenFromResponse={(res) => {
        // @ts-ignore
        // save token
        localStorage.setItem("token", res.data.accessToken);
      }}
      isGetTokenSuccessful={(res) => {
        // @ts-ignore
        // according to the data returned by the server,
        // determine whether the `token` is successfully obtained through `code` and `state`.
        return res.success === true;
      }}
    />
  );
};
