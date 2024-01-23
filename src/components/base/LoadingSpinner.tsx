import type { FC } from 'react';

import styles from '@/styles/scss/base/loader.module.scss';

const LoadingSpinner: FC = () => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className={styles.loader} />
    </div>
  );
};

export default LoadingSpinner;
