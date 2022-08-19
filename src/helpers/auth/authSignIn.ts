// Auth Session
import {
  fetchDiscoveryAsync,
  CodeChallengeMethod,
  AuthRequest,
  AccessTokenRequest,
  TokenResponse,
} from 'expo-auth-session';
import { createURL } from 'expo-linking';

// Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// App environment helpers
import { AppEnvironment } from 'helpers/appenv';

// Sign-in authentication handler
export default (
    env: AppEnvironment,
    callback: (token: TokenResponse) => void
  ) =>
  async (): Promise<void> => {
    // Retrieve the auth configuration
    const { auth: config } = env;

    // Create a deep link for authentication redirects
    const redirectUri = createURL('/auth');
    console.log(`[AUTH : SignIn] Created redirect URI: ${redirectUri}`);

    // Construct the OIDC code request
    const codeRequest = new AuthRequest({
      clientId: config.client_id,
      redirectUri,
      scopes: config.scopes.split(' '),
      codeChallengeMethod: CodeChallengeMethod.S256,
    });

    // Fetch the discovery metadata
    const discovery = await fetchDiscoveryAsync(config.server);

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
      await callback(accessToken);
      console.log('[AUTH : SignIn] Callback complete!');
    } else {
      console.log(
        `[AUTH : SignIn] The sign in could not be completed (result type: ${result.type})`
      );
      return null;
    }
  };
