import { Montserrat as FontSans } from 'next/font/google';
import { type FC, type ReactNode } from 'react';

import { cn } from '@/lib/utils';
import Footer from './Footer';
import Header from './Header';
import Head from './Meta';

type Props = {
  children?: ReactNode;
};

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Head />
      <div
        className={cn(
          'flex min-h-screen flex-col  bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <Header />
        <div className="h-20" />
        <main className="flex flex-1 flex-col px-4 pb-8">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
