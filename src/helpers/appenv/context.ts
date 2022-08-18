import { createContext } from 'react';
import { AppEnvironmentType } from './provider';

export interface AppEnvironment {
  timeout: number;
  auth: {
    server: string;
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
  config: AppEnvironment;
  type: AppEnvironmentType;
  setEnvironment: (environment: AppEnvironmentType) => void;
}

export default createContext<AppEnvironmentContext>(null);
