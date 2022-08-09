import { createContext } from 'react';
import { TokenResponse } from 'expo-auth-session';

interface AuthContext {
  credentials: TokenResponse | null;
  loading: boolean;
  authenticated: boolean;
  signIn: () => Promise<TokenResponse>;
  signOut: () => Promise<void>;
}

export default createContext<AuthContext>(null);
