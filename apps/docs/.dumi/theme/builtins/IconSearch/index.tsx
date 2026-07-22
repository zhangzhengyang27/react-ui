import React, { Suspense } from 'react';
import { Skeleton } from '@xiaoye-react/ui';

import classes from './index.module.css';

const IconSearch = React.lazy(() => import('./IconSearch'));

const IconSearchFallback: React.FC = () => {
  return (
    <>
      <div className={classes.searchWrapper}>
        <Skeleton height={40} width="100%" />
        <Skeleton height={40} width="100%" />
      </div>
      <Skeleton height={32} width={100} style={{ margin: '28px 0 10px' }} />
      <div className={classes.fallbackWrapper}>
        {Array.from({ length: 24 }).map((_, index) => (
          <div key={index} className={classes.skeletonWrapper}>
            <Skeleton height={110} width="100%" />
          </div>
        ))}
      </div>
    </>
  );
};

const SearchWrapper: React.FC = () => (
  <Suspense fallback={<IconSearchFallback />}>
    <IconSearch />
  </Suspense>
);

export default SearchWrapper;
