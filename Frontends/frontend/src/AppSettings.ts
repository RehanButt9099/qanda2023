export const server =
  process.env.REACT_APP_ENV === 'production'
    ? 'https://your-backend.azurewebsites.net'
    : process.env.REACT_APP_ENV === 'staging'
    ? 'https://your-backend-staging.azurewebsites.net'
    : 'https://localhost:7037';

export const webAPIUrl = `${server}/api`;

export const authSettings = {
  domain: 'dev-mgx2m336d2n3g45f.us.auth0.com',
  clientId: 'xD9Y1eGs4A52gZnVGsik2ZHUkawycoO6',
  redirectUri: window.location.origin + '/signin-callback',
  scope: 'openid profile QandAAPI email',
  audience: 'https://qanda',
};
