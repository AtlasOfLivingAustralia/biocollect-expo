import { createContext } from 'react';
import { TokenResponse } from 'expo-auth-session';
import { JwtClaims, OidcStandardClaims } from './claims';

interface AuthContext {
  credentials: TokenResponse | null;
  profile: OidcStandardClaims | null;
  access: JwtClaims | null;
  loading: boolean;
  authenticated: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

export default createContext<AuthContext>(null);
