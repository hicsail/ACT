export default () => ({
  casdoor: {
    endpoint: process.env.CASDOOR_ENDPOINT,
    clientId: process.env.CASDOOR_CLIENT_ID,
    clientSecret: process.env.CASDOOR_CLIENT_SECRET,
    certificate: process.env.CASDOOR_CERTIFICATE,
    orgName: process.env.CASDOOR_ORG_NAME
  },
  frontend: {
    authCallback: process.env.FRONTEND_AUTH_CALLBACK
  }
});
