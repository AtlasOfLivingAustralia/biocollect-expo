import { createContext } from 'react';
import * as biocollect from './endpoints/biocollect';

interface APIContext {
  call: () => void;
  biocollect: typeof biocollect;
}

export default createContext<APIContext>(null);
