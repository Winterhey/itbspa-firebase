import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { type FC } from 'react';

import Layout from '@/components/layout/Layout';
import Loader from '@/components/layout/Loader';
import Provider from '@/context/Provider';
import { type NextPage } from '@/types/layout';

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-amber/theme.css';

import '@/styles/scss/globals.scss';

type Props = AppProps & {
  Component: NextPage;
};

const App: FC<Props> = ({ Component, pageProps, router }) => {
  return (
    <>
      <Provider>
        {Component.getLayout ? (
          <Loader>
            {Component.getLayout(
              <Component {...pageProps} key={router.asPath} />,
            )}
          </Loader>
        ) : (
          <Layout>
            <Loader>
              <Component {...pageProps} key={router.asPath} />
            </Loader>
          </Layout>
        )}
      </Provider>
    </>
  );
};

export default appWithTranslation(App);
