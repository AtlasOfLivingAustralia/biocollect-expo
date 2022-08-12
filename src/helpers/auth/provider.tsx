import { ReactNode, ReactElement, useEffect, useState } from 'react';
import { TokenResponse } from 'expo-auth-session';
import jwtDecode from 'jwt-decode';

// Authentication helpers
import { OidcStandardClaims } from './claims';
import AuthContext from './context';
import authSignIn from './authSignIn';
import authSignOut from './authSignOut';

// Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthProviderProps {
  children?: ReactNode;
}

export default (props: AuthProviderProps): ReactElement => {
  const [loading, setLoading] = useState<boolean>(true);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [credentials, setCredentials] = useState<TokenResponse | null>(null);
  const [profile, setProfile] = useState<OidcStandardClaims | null>(null);

  // Helper function to update the auth state on sign in
  const onSignInSuccess = (token: TokenResponse) => {
    setCredentials(token);
    setProfile(jwtDecode<OidcStandardClaims>(token.idToken));
    setAuthenticated(true);
  };

  // Helper function to update the auth state on sign out
  const onSignOutSuccess = () => {
    setAuthenticated(false);
    setProfile(null);
    setCredentials(null);
  };

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
          onSignInSuccess(parsed);

          console.log(
            '[AUTH : Provider] Token is fresh, updating provider credentials...'
          );
        } else {
          await AsyncStorage.removeItem('authToken');

          console.log(
            '[AUTH : Provider] Token is not fresh, removing credentials from store...'
          );
        }
      }
      setLoading(false);
    }

    getStoredCreds();
  }, []);

  useEffect(
    () => console.log('auth provider authenticated update'),
    [authenticated]
  );

  return (
    <AuthContext.Provider
      value={{
        credentials,
        profile,
        loading,
        authenticated,
        signIn: authSignIn((token) => onSignInSuccess(token)),
        signOut: authSignOut(credentials, onSignOutSuccess),
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
