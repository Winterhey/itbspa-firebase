import { PrimeReactProvider } from 'primereact/api';
import { type FC, type PropsWithChildren } from 'react';

const Provider: FC<PropsWithChildren> = ({ children }) => {
  return <PrimeReactProvider>{children}</PrimeReactProvider>;
};

export default Provider;
