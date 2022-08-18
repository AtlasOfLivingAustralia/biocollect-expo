import { createContext } from 'react';
import biocollect from './endpoints/biocollect';

interface APIContext {
  biocollect: ReturnType<typeof biocollect>;
}

export default createContext<APIContext>(null);
