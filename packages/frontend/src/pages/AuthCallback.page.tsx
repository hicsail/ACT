import { FC, useEffect } from 'react';
import { config } from '../config/configuration';
import { useSearchParams } from 'react-router';

export const AuthCallback: FC = () => {
  const [searchParams, _setSearchParams] = useSearchParams();

  const handleLogin  = async (code: string) => {
    const loginResponse = await fetch(`${config.backendURL}/casdoor/signin?code=${code}`, {
      method: 'POST'
    })
    const token = (await loginResponse.json()).token;
    console.log(token);
  };

  useEffect(() => {
    const code = searchParams.get('code');

    if (code) {
      handleLogin(code);
    }


    console.log(code);
  }, [searchParams]);

  return (
    <p>One moment please</p>
  );
};
