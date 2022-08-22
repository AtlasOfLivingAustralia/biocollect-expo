import { ReactNode, ReactElement, useEffect, useState, useContext } from 'react';
import { TokenResponse } from 'expo-auth-session';
import jwtDecode from 'jwt-decode';
import { AppEnvironmentContext } from 'helpers/appenv';

// Authentication helpers
import { JwtClaims, OidcStandardClaims } from './claims';
import AuthContext from './context';
import authSignIn from './authSignIn';
import authSignOut from './authSignOut';

// Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthProviderProps {
  children?: ReactNode;
}

const AuthProvider = (props: AuthProviderProps): ReactElement => {
  const [loading, setLoading] = useState<boolean>(true);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [credentials, setCredentials] = useState<TokenResponse | null>(null);
  const [profile, setProfile] = useState<OidcStandardClaims | null>(null);
  const [access, setAccess] = useState<JwtClaims | null>(null);
  const { config: env } = useContext(AppEnvironmentContext);

  // Helper function to update the auth state on sign in
  const onSignInSuccess = (token: TokenResponse) => {
    setCredentials(token);
    setProfile(jwtDecode<OidcStandardClaims>(token.idToken));
    setAccess(jwtDecode<JwtClaims>(token.accessToken));
    setAuthenticated(true);
  };

  // Helper function to update the auth state on sign out
  const onSignOutSuccess = () => {
    setAuthenticated(false);
    setProfile(null);
    setAccess(null);
    setCredentials(null);
  };

  // Grab the stored credentials from the SecureStore
  useEffect(() => {
    async function getStoredCreds() {
      const stored = await AsyncStorage.getItem('@auth_token');
      const parsed: TokenResponse | null = stored ? new TokenResponse(JSON.parse(stored)) : null;

      // Handle state updates
      if (parsed) {
        if (TokenResponse.isTokenFresh(parsed)) {
          onSignInSuccess(parsed);

          console.log('[AUTH : Provider] Token is fresh, updating provider credentials...');
        } else {
          await AsyncStorage.removeItem('@auth_token');

          console.log('[AUTH : Provider] Token is not fresh, removing credentials from store...');
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
        profile,
        access,
        loading,
        authenticated,
        signIn: authSignIn(env, (token) => onSignInSuccess(token)),
        signOut: authSignOut(env, credentials, onSignOutSuccess),
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
