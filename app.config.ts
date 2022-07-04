export default {
  defaultTimeout: 20,
  auth: {
    server: 'https://auth-dev.ala.org.au',
    register: '/userdetails/registration/createAccount',
    userdetails: '/userdetails/userDetails/getUserDetails?userName=',
    token: '/cas/oidc/token',
    openid: {
      clientId: 'auth-dev-oidc-client-id',
      clientSecret: 'u85789gnghdfb765',
      scope: 'email openid profile'
    }
  }
}