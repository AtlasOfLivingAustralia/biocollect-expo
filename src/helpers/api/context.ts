import { createContext } from 'react';

interface APIContext {
  call: () => void;
}

export default createContext<APIContext>(null);
