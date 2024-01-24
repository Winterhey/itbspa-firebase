import { PrimeReactProvider } from 'primereact/api';
import { type FC, type PropsWithChildren } from 'react';
import { NotificationProvider } from './NotificationContext';

const Provider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <PrimeReactProvider>
      <NotificationProvider>{children}</NotificationProvider>
    </PrimeReactProvider>
  );
};

export default Provider;
