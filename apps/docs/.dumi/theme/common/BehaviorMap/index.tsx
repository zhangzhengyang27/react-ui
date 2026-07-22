import type { FC } from 'react';
import React, { Suspense } from 'react';
import { Skeleton } from '@xiaoye-react/ui';

import useLocale from '../../../hooks/useLocale';
import type { BehaviorMapProps } from './BehaviorMap';
import styles from './index.module.css';

const InternalBehaviorMap = React.lazy(() => import('./BehaviorMap'));

const locales = {
  cn: {
    placeholder: '正在载入行为模式地图...',
  },
  en: {
    placeholder: 'Loading behavior map...',
  },
};

const BehaviorMapFallback: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <div className={styles.fallback}>
      <Skeleton height={600} radius="lg">
        <span className={styles.placeholder}>{locale.placeholder}</span>
      </Skeleton>
    </div>
  );
};

const BehaviorMap: FC<BehaviorMapProps> = (props) => (
  <Suspense fallback={<BehaviorMapFallback />}>
    <InternalBehaviorMap {...props} />
  </Suspense>
);

export default BehaviorMap;
