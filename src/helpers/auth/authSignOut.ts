// Auth Session
import {
  fetchDiscoveryAsync,
  revokeAsync,
  TokenResponse,
  TokenTypeHint,
} from 'expo-auth-session';
import { openBrowserAsync } from 'expo-web-browser';
import { getNetworkStateAsync } from 'expo-network';

// Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// Sign-in authentication handler
export default (credentials: TokenResponse, callback: () => void) =>
  async (): Promise<void> => {
    // Clear the auth token from storage
    console.log(`[AUTH : SignOut] Removing auth state from storage...`);
    await AsyncStorage.removeItem('authToken');

    // Revoke the access token
    if ((await getNetworkStateAsync()).isInternetReachable) {
      // Create a deep link for authentication redirects
      // const redirectUri = Linking.createURL('/auth');

      // Fetch the discovery metadata
      const discovery = await fetchDiscoveryAsync(
        'https://auth-test.ala.org.au/cas/oidc' // TODO: LOAD FROM CONFIG
      );

      // Invalidate the access token and refresh token
      if (credentials) {
        console.log(`[AUTH : SignOut] Revoking accessToken & refresh token...`);

        // Revoke access & refresh tokens
        await Promise.all([
          revokeAsync(
            {
              token: credentials.accessToken,
              tokenTypeHint: TokenTypeHint.AccessToken,
            },
            discovery
          ),
          revokeAsync(
            {
              token: credentials.refreshToken,
              tokenTypeHint: TokenTypeHint.RefreshToken,
            },
            discovery
          ),
        ]);
      }

      // Open the browser to logout
      await callback();
      openBrowserAsync(discovery.endSessionEndpoint);
    }
  };
