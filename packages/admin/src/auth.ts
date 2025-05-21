import { AuthProvider } from 'react-admin';
import { config } from './config/configuration';

const JWT_TOKEN_KEY = 'CASDOOR_JWT_ADMIN';

const hasJWTExpired = (token: string): boolean => {
  const expiry = JSON.parse(window.atob(token.split('.')[1])).exp;
  return Math.floor(new Date().getTime() / 1000) >= expiry;
};

export const authProvider: AuthProvider = {
  login: async () => {

  },
  checkAuth: async () => {
    // Check for an existing token
    const existingToken = localStorage.getItem(JWT_TOKEN_KEY);

    // If a non-expired token was found, user is authorized
    if (existingToken && !hasJWTExpired(existingToken)) {
      return;
    }

    // Otherwise, figure out the login URL to redirect to
    const result = await fetch(`${config.backendURL}/casdoor/redirect?origin=admin`);
    const body = await result.json();

    window.location.href = body.url;
  },
  handleCallback: async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (!code) {
      throw new Error('Missing code in URL');
    }

    // Fetch the JWT
    const loginResponse = await fetch(`${config.backendURL}/casdoor/signin?code=${code}`, {
      method: 'POST'
    });

    // Pull out the token
    const token = (await loginResponse.json()).token;

    // Store the token
    localStorage.setItem(JWT_TOKEN_KEY, token);
  },
  logout: async () => {

  },
  checkError: async () => {

  }
};
