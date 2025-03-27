export const config = {
  casdoor: {
    loginURL: import.meta.env.VITE_LOGIN_URL,
    serverUrl: import.meta.env.VITE_CASDOOR_SERVER,
    clientId: import.meta.env.VITE_CASDOOR_CLIENT_ID,
    appName: import.meta.env.VITE_CASDOOR_APP_NAME,
    organizationName: import.meta.env.VITE_ORGANIZATION_NAME,
    redirectPath: import.meta.env.VITE_CASDOOR_REDIRECT_PATH,
    signinPath: import.meta.env.VITE_CASDOOR_SIGNIN_PATH
  }
};
