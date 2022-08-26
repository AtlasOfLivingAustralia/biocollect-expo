import { createContext } from 'react';
import { AppEnvironmentType } from './provider';

export interface AppEnvironment {
  timeout: number;
  auth: {
    user_pool: string;
    client_id: string;
    scopes: string;
  };
  biocollect: {
    biocollect_url: string;
    ecodata_url: string;
  };
}

export interface AppEnvironmentConfig {
  [key: string]: AppEnvironment;
}

interface AppEnvironmentContext {
  currentConfig: AppEnvironment;
  config: AppEnvironmentConfig;
  type: AppEnvironmentType;
  setEnvironment: (environment: AppEnvironmentType) => void;
}

export default createContext<AppEnvironmentContext>(null);
