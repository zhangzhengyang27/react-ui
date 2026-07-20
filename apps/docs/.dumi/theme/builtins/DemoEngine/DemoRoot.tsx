import type { CSSProperties } from 'react';
import cx from 'clsx';

export interface DemoRootProps extends React.ComponentProps<'div'> {}

export function DemoRoot({ className, style, ...others }: DemoRootProps) {
  const rootStyle: CSSProperties = {
    borderRadius: 'var(--ui-radius-lg, 8px)',
    overflow: 'hidden',
    ...style,
  };
  return <div className={cx('demo-engine-root', className)} style={rootStyle} {...others} />;
}
