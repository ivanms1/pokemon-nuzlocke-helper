import React from 'react';
import { Spinner } from '@blueprintjs/core';

import styles from './Loading.module.css';

interface LoadingPageProps {
  size?: number;
}

const LoadingPage = ({ size = 50 }: LoadingPageProps) => {
  return (
    <div className={styles.LoadingPage}>
      <Spinner size={size} />
    </div>
  );
};

export default LoadingPage;
