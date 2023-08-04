const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const ISSUER = process.env.REACT_APP_ISSUER;
const OKTA_TESTING_DISABLEHTTPSCHECK =
  process.env.REACT_APP_OKTA_TESTING_DISABLEHTTPSCHECK;
const BASENAME = "";
const REDIRECT_URI = `${window.location.origin}${BASENAME}/login/callback`;

const config = {
  oidc: {
    clientId: CLIENT_ID,
    issuer: ISSUER,
    redirectUri: REDIRECT_URI,
    scopes: ["openid", "profile", "email"],
    pkce: true,
    disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
  },
};

export default config;
