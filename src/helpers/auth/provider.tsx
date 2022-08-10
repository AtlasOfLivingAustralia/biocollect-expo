import { ReactNode, ReactElement, useEffect, useState } from 'react';
import { TokenResponse } from 'expo-auth-session';

// Authentication helpers
import AuthContext from './context';
import signIn from './authSignIn';
import signOut from './authSignOut';

// Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthProviderProps {
  children?: ReactNode;
}

export default (props: AuthProviderProps): ReactElement => {
  const [loading, setLoading] = useState<boolean>(true);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [credentials, setCredentials] = useState<TokenResponse | null>(null);

  // Grab the stored credentials from the SecureStore
  useEffect(() => {
    async function getStoredCreds() {
      const stored = await AsyncStorage.getItem('authToken');
      const parsed: TokenResponse | null = stored
        ? new TokenResponse(JSON.parse(stored))
        : null;

      // Handle state updates
      if (parsed) {
        if (TokenResponse.isTokenFresh(parsed)) {
          setCredentials(parsed);
          setAuthenticated(true);

          console.log('Token is fresh, updating provider credentials...');
        } else {
          await AsyncStorage.removeItem('authToken');

          console.log('Token is not fresh, removing credentials from store...');
        }
      }
      setLoading(false);
    }

    getStoredCreds();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        credentials,
        loading,
        authenticated,
        signIn,
        signOut: signOut(credentials, () => {
          setAuthenticated(false);
          setCredentials(null);
        }),
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
