import { type NextPage as DefaultNextPage } from 'next';
import { type ReactElement, type ReactNode } from 'react';

export type NextPage<P = Record<string, unknown>> = DefaultNextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
