import React from 'react';
import { Skeleton } from '@xiaoye-react/ui';

import classes from './DemoFallback.module.css';

const DemoFallback = () => {
  return (
    <Skeleton
      className={classes.skeletonWrapper}
      style={{ width: '100%', height: '100%' }}
    >
      {' '}
    </Skeleton>
  );
};

export default DemoFallback;
