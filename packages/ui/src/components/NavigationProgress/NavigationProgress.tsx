import { useEffect, useRef } from 'react';
import { ElementProps } from '../../core/Box/Box';
import { UIColor } from '../../core/UIProvider/theme.types';
import { getDefaultZIndex } from '../../core/utils/index';
import { OptionalPortal } from '../Portal/OptionalPortal';
import { BasePortalProps } from '../Portal/Portal';
import { Progress } from '../Progress/Progress';
import {
  NprogressStore,
  nprogressStore,
  resetNavigationProgressAction,
  useNprogress,
} from './nprogress.store';
import classes from './NavigationProgress.module.css';

export interface NavigationProgressProps extends ElementProps<'div'> {
  /** Component store, controls state */
  store?: NprogressStore;

  /** Initial progress value @default 0 */
  initialProgress?: number;

  /** Key of `theme.colors` of any other valid CSS color @default theme.primaryColor */
  color?: UIColor;

  /** Controls height of the progress bar */
  size?: number;

  /** Step interval in ms @default 500 */
  stepInterval?: number;

  /** Determines whether the progress bar should be rendered within `Portal` @default true */
  withinPortal?: boolean;

  /** Props to pass down to the `Portal` when `withinPortal` is `true` */
  portalProps?: Omit<BasePortalProps, 'withinPortal'>;

  /** Progressbar z-index @default 9999 */
  zIndex?: React.CSSProperties['zIndex'];
}

export function NavigationProgress({
  initialProgress = 0,
  color,
  size = 3,
  stepInterval = 500,
  withinPortal = true,
  portalProps,
  zIndex = getDefaultZIndex('max'),
  store = nprogressStore,
  ...others
}: NavigationProgressProps) {
  // initialize 移入 effect：渲染期写共享单例 store 属于副作用，
  // 且并发渲染下被丢弃的渲染也会消耗一次性标志；多实例互相覆盖的问题同样源于此
  const initializedRef = useRef(false);
  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;
      store.initialize({
        mounted: false,
        progress: initialProgress,
        interval: -1,
        step: 1,
        stepInterval,
        timeouts: [],
      });
    }
  }, [store, initialProgress, stepInterval]);

  const state = useNprogress(store);

  // store 为共享单例时，卸载任一实例都会复位全局进度——这是单例设计的固有语义，
  // 多实例应各自传入独立 store（createNprogress()）
  useEffect(() => () => resetNavigationProgressAction(store), [store]);

  return (
    <OptionalPortal {...portalProps} withinPortal={withinPortal}>
      <Progress
        radius={0}
        value={state.progress}
        size={size}
        color={color}
        classNames={classes}
        data-mounted={state.mounted || undefined}
        __vars={{ '--nprogress-z-index': zIndex?.toString() }}
        {...others}
      />
    </OptionalPortal>
  );
}

NavigationProgress.displayName = '@xiaoye-react/nprogress/NavigationProgress';
