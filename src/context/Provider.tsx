import { type FC, type PropsWithChildren } from 'react';

import { NotificationProvider } from './NotificationContext';

const Provider: FC<PropsWithChildren> = ({ children }) => {
  return <NotificationProvider>{children}</NotificationProvider>;
};

export default Provider;
