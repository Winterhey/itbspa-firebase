import { type FC, type ReactNode } from 'react';

import Footer from './Footer';
import Header from './Header';
import Head from './Meta';

type Props = {
  children?: ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Head />
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="h-20" />
        <main className="flex flex-1 flex-col px-4 pb-8">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
