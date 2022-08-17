import {
  ReactNode,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react';
import axios from 'axios';

// Expo helpers
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Contexts
import APIContext from './context';
import AuthContext from '../auth/context';

// API endpoints
import biocollect from './endpoints/biocollect';

interface APIProviderProps {
  children?: ReactNode;
}

export type APIEnvironment = 'prod' | 'staging' | 'test' | 'dev';

export default (props: APIProviderProps): ReactElement => {
  const [environment, setEnvironment] = useState<APIEnvironment>(
    Constants.manifest.extra.environment || 'prod'
  );
  const auth = useContext(AuthContext);

  // useEffect hook to automatically write environment changes to persistent storage
  useEffect(() => {
    (async () => {
      await AsyncStorage.setItem('@api_environment', environment);
      console.log(
        `[API : Provider] Updated environment in AsyncStorage to '${environment}'`
      );
    })();
  }, [environment]);

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
        biocollect: biocollect(environment),
        setEnvironment: (newEnv: APIEnvironment) => setEnvironment(newEnv),
      }}
    >
      {props.children}
    </APIContext.Provider>
  );
};
