// Auth Session
import {
  fetchDiscoveryAsync,
  CodeChallengeMethod,
  AuthRequest,
  AccessTokenRequest,
  TokenResponse,
  DiscoveryDocument,
} from 'expo-auth-session';
import { createURL } from 'expo-linking';

// Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// App environment helpers
import { AppEnvironment } from 'helpers/appenv';

// Sign-in authentication handler
export default (env: AppEnvironment, callback: (token: TokenResponse) => void) =>
  async (): Promise<boolean> => {
    // Retrieve the auth configuration
    const { auth: config } = env;

    // Create a deep link for authentication redirects
    const redirectUri = createURL('/auth/signin');
    console.log(`[AUTH : SignIn] Created redirect URI: ${redirectUri}`);

    // Construct the OIDC code request
    const codeRequest = new AuthRequest({
      clientId: config.client_id,
      redirectUri,
      scopes: config.scopes.split(' '),
      codeChallengeMethod: CodeChallengeMethod.S256,
    });

    // Create the discovery document variable
    let discovery: DiscoveryDocument | null = null;

    // Fetch the discovery metadata
    try {
      const discoveryUrl = `https://cognito-idp.${config.user_pool.split('_')[0]}.amazonaws.com/${
        config.user_pool
      }`;
      console.log(`[AUTH : SignIn] Retrieving discovery document from ${discoveryUrl}`);
      discovery = await fetchDiscoveryAsync(discoveryUrl);

      // If no authorization endpoint is supplied, throw an error
      if (!discovery.authorizationEndpoint)
        throw new Error('Returned discovery document does not have valid authorization endpoint');
    } catch (error) {
      throw new Error('Could not fetch discovery document', {
        cause: error,
      });
    }

    // Start the authentication flow
    const result = await codeRequest.promptAsync(discovery);
    console.log('[AUTH : SignIn] Recieved initial PKCE code response');

    // If the authentication was successfull
    if (result.type === 'success') {
      // Construct the OIDC access token request
      const tokenRequest = new AccessTokenRequest({
        clientId: codeRequest.clientId,
        scopes: codeRequest.scopes,
        code: result.params.code,
        redirectUri,
        extraParams: {
          code_verifier: codeRequest.codeVerifier,
        },
      });

      // Perform the token exchange request
      const accessToken = await tokenRequest.performAsync(discovery);
      console.log('[AUTH : SignIn] Recieved access & refresh token');

      // Store the token in async storage
      await AsyncStorage.setItem('@auth_token', JSON.stringify(accessToken));
      console.log('[AUTH : SignIn] Updated auth token in AsyncStorage');

      // Run the callback function
      await callback(accessToken);
      console.log('[AUTH : SignIn] Callback complete!');

      return true;
    } else {
      console.log(
        `[AUTH : SignIn] The sign in could not be completed (result type: ${result.type})`
      );

      return false;
    }
  };
