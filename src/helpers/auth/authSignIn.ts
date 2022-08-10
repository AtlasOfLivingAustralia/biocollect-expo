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

// Sign-in authentication handler
export default async (): Promise<TokenResponse> => {
  // Create a deep link for authentication redirects
  const redirectUri = createURL('/auth');
  console.log(`[AUTH : SignIn] Created redirect URI: ${redirectUri}`);

  // Construct the OIDC code request
  const codeRequest = new AuthRequest({
    clientId: 'oidc-expo-test', // TODO: LOAD FROM CONFIG
    redirectUri,
    scopes: ['openid', 'email', 'profile'], // TODO: LOAD FROM CONFIG
    codeChallengeMethod: CodeChallengeMethod.S256,
  });

  // Fetch the discovery metadata
  const discovery = await fetchDiscoveryAsync(
    'https://auth-test.ala.org.au/cas/oidc' // TODO: LOAD FROM CONFIG
  );

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

    // Store the token in async storage
    await AsyncStorage.setItem('authToken', JSON.stringify(accessToken));

    return accessToken;
  } else {
    throw new Error(
      `The sign in could not be completed (result type: ${result.type})`
    );
  }
};
