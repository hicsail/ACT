export default () => ({
  casdoor: {
    endpoint: process.env.CASDOOR_ENDPOINT,
    clientId: process.env.CASDOOR_CLIENT_ID,
    clientSecret: process.env.CASDOOR_CLIENT_SECRET,
    certificate: process.env.CASDOOR_CERTIFICATE,
    orgName: process.env.CASDOOR_ORG_NAME,
    appName: process.env.CASDOOR_APP_NAME
  },
  frontend: {
    authCallback: process.env.FRONTEND_AUTH_CALLBACK
  },
  admin: {
    authCallback: process.env.ADMIN_AUTH_CALLBACK
  },
  s3: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.S3_REGION || 'us-east-1',
    bucket: process.env.S3_BUCKET,
    signedExpiration: process.env.S3_SIGNED_EXPIRATION || 5 * 60,
    downloadZipsFolder: process.env.S3_DOWNLOAD_FOLDER || 'downloads'
  },
  meta: {
    taskIteration: process.env.TASK_ITERATION || 'Sum25'
  }
});
