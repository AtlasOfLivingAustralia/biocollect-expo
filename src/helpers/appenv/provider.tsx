import { ReactNode, ReactElement, useEffect, useState } from 'react';

// Expo helpers
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Contexts
import AppEnvironmentContext from './context';

interface AppEnvironmentProviderProps {
  children?: ReactNode;
}

export type AppEnvironmentType = 'prod' | 'staging' | 'test' | 'dev';

const AppEnvironmentProvider = (props: AppEnvironmentProviderProps): ReactElement => {
  const [storageLoaded, setStorageLoaded] = useState<boolean>(false);
  const [type, setType] = useState<AppEnvironmentType>(
    Constants.manifest.extra.environment || 'prod'
  );

  // useEffect hook to automatically write environment changes to persistent storage
  useEffect(() => {
    if (storageLoaded) {
      AsyncStorage.setItem('@app_environment', type.toString(), () => {
        console.log(
          `[AppEnv : Provider] Updated environment in AsyncStorage to '${type.toString()}'`
        );
      });
    }
  }, [type, storageLoaded]);

  // useEffect hook to read the app environment type when mounted
  useEffect(() => {
    (async () => {
      const storedType = await AsyncStorage.getItem('@app_environment');
      if (storedType) {
        setType(storedType as AppEnvironmentType);
        console.log(
          `[AppEnv : Provider] Found initial App Environment type '${storedType}' from AsyncStorage`
        );
      } else {
        console.log('[AppEnv : Provider] No stored App Environment type found');
      }

      setStorageLoaded(true);
    })();
  }, []);

  return (
    <AppEnvironmentContext.Provider
      value={{
        type,
        currentConfig: Constants.manifest.extra.config[type],
        config: Constants.manifest.extra.config,
        setEnvironment: (newType: AppEnvironmentType) => setType(newType),
      }}>
      {storageLoaded ? props.children : null}
    </AppEnvironmentContext.Provider>
  );
};

export default AppEnvironmentProvider;
