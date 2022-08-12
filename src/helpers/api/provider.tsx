import { ReactNode, ReactElement, useContext, useEffect } from 'react';

// Contexts
import APIContext from './context';
import AuthContext from '../auth/context';

// Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface APIProviderProps {
  children?: ReactNode;
}

export default (props: APIProviderProps): ReactElement => {
  const auth = useContext(AuthContext);

  // UseEffect hook to add / remove access token the axios globals
  useEffect(() => {
    if (auth.authenticated) {
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${auth.credentials.accessToken}`;
      console.log('[Auth : SignIn] Updated axios auth header');
    } else {
      delete axios.defaults.headers.common['Authorization'];
      console.log('[Auth : SignOut] Removed token from axios auth header');
    }
  }, [auth.authenticated]);

  return (
    <APIContext.Provider
      value={{
        call: () => console.log(auth.credentials),
      }}
    >
      {props.children}
    </APIContext.Provider>
  );
};
