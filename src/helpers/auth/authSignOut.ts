// Auth Session
import { fetchDiscoveryAsync } from 'expo-auth-session';
import { openAuthSessionAsync } from 'expo-web-browser';
import { getNetworkStateAsync } from 'expo-network';
import * as Linking from 'expo-linking';

// Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppEnvironment } from 'helpers/appenv';

// Sign-in authentication handler
export default (env: AppEnvironment, callback: () => void) => async (): Promise<void> => {
  // Retrieve the auth configuration
  const { auth: config } = env;

  // Create a deep link for authentication redirects
  const redirectUri = Linking.createURL(config.user_pool ? '/auth/signout' : '/auth');
  console.log(`[AUTH : SignOut] Created redirect URI: ${redirectUri}`);

  // Clear the auth token from storage
  console.log('[AUTH : SignOut] Removing auth state from storage...');
  await AsyncStorage.removeItem('@auth_token');

  // Sign out (only if the user has internet access)
  if ((await getNetworkStateAsync()).isInternetReachable) {
    try {
      const discoveryUrl =
        config.url ||
        `https://cognito-idp.${config.user_pool.split('_')[0]}.amazonaws.com/${config.user_pool}`;
      console.log(`[AUTH : SignOut] Retrieving discovery document from ${discoveryUrl}`);
      const { tokenEndpoint, endSessionEndpoint } = await fetchDiscoveryAsync(discoveryUrl);

      // Navigate the user to the sign out page
      console.log('[AUTH : SignOut] Opening auth session for sign out...');
      await openAuthSessionAsync(
        endSessionEndpoint ||
          `${tokenEndpoint.substring(0, tokenEndpoint.indexOf('/oauth2'))}/logout?client_id=${
            config.client_id
          }&logout_uri=${redirectUri}`,
        redirectUri
      );

      // Execute the callback function
      callback();
      return;
    } catch (error) {
      console.log('[AUTH : SignOut] Browser sign-out error', error);
    }
  } else {
    console.log('[AUTH : SignOut] Network is not reachable, skipping browser-based sign-out.');
  }

  // Execute the callback function
  callback();
};
