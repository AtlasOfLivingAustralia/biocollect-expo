import { ReactNode, ReactElement, useContext, useEffect } from 'react';
import axios from 'axios';

// Contexts
import APIContext from './context';
import AuthContext from '../auth/context';
import AppEnvironmentContext from '../appenv/context';

// API endpoints & environment config
import biocollect from './endpoints/biocollect';

interface APIProviderProps {
  children?: ReactNode;
}

const APIProvider = (props: APIProviderProps): ReactElement => {
  const { config: env } = useContext(AppEnvironmentContext);
  const auth = useContext(AuthContext);

  // useEffect hook to add / remove access token the axios globals
  useEffect(() => {
    if (auth.authenticated) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${auth.credentials.accessToken}`;
      console.log('[API : Provider] Updated axios auth header');
    } else {
      delete axios.defaults.headers.common['Authorization'];
      console.log('[API : Provider] Removed token from axios auth header');
    }
  }, [auth.authenticated]);

  return (
    <APIContext.Provider
      value={{
        biocollect: biocollect(env),
      }}>
      {props.children}
    </APIContext.Provider>
  );
};

export default APIProvider;
