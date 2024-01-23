import { AnimatePresence, motion } from 'framer-motion';
import { Router, useRouter } from 'next/router';
import { useEffect, useState, type FC, type PropsWithChildren } from 'react';

import LoadingSpinner from '@/components/base/LoadingSpinner';

const Loader: FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };

    Router.events.on(
      'routeChangeStart',
      (route: string, context: Record<string, unknown>) => {
        if (route === router.asPath) return;

        if (context.shallow === true) return;
        start();
      },
    );
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  return (
    <AnimatePresence
      mode="wait"
      initial={false}
      onExitComplete={() => window.scrollTo(0, 0)}
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        <motion.div
          initial={{ x: 700, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 700, opacity: 0 }}
          transition={{
            type: 'keyframes',
          }}
          className="flex flex-1 flex-col"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
