import { ReactNode, ReactElement, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Contexts
import APIContext from './context';
import AuthContext from '../auth/context';

// API endpoints
import * as biocollect from './endpoints/biocollect';

interface APIProviderProps {
  children?: ReactNode;
}

export default (props: APIProviderProps): ReactElement => {
  const auth = useContext(AuthContext);

  // useEffect hook to add / remove access token the axios globals
  useEffect(() => {
    if (auth.authenticated) {
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${auth.credentials.accessToken}`;
      console.log('[API : Provider] Updated axios auth header');
    } else {
      delete axios.defaults.headers.common['Authorization'];
      console.log('[API : Provider] Removed token from axios auth header');
    }
  }, [auth.authenticated]);

  return (
    <APIContext.Provider
      value={{
        call: () => console.log(auth.profile),
        biocollect,
      }}
    >
      {props.children}
    </APIContext.Provider>
  );
};
