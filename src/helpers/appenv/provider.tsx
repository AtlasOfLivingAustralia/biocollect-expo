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

export default (props: AppEnvironmentProviderProps): ReactElement => {
  const [type, setType] = useState<AppEnvironmentType>(
    Constants.manifest.extra.environment || 'prod'
  );

  // useEffect hook to automatically write environment changes to persistent storage
  useEffect(() => {
    (async () => {
      await AsyncStorage.setItem('@app_environment', type);
      console.log(
        `[API : Provider] Updated environment in AsyncStorage to '${type}'`
      );
    })();
  }, [type]);

  return (
    <AppEnvironmentContext.Provider
      value={{
        type,
        config: Constants.manifest.extra.config[type],
        setEnvironment: (newType: AppEnvironmentType) => setType(newType),
      }}
    >
      {props.children}
    </AppEnvironmentContext.Provider>
  );
};
