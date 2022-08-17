import { createContext } from 'react';
import biocollect from './endpoints/biocollect';
import { APIEnvironment } from './provider';

interface APIContext {
  biocollect: ReturnType<typeof biocollect>;
  setEnvironment: (environment: APIEnvironment) => void;
}

export default createContext<APIContext>(null);
