import type { CSSProperties } from 'react';
import { Box } from '@xiaoye-react/ui';

export interface DemoAreaProps {
  children?: React.ReactNode;
  withPadding?: boolean;
  centered?: boolean;
  maxWidth?: number | string;
  minHeight?: number | string;
  dimmed?: boolean;
  striped?: boolean;
  overflow?: 'hidden' | 'auto';
}

export function DemoArea({
  withPadding = true,
  overflow,
  centered,
  maxWidth,
  minHeight,
  children,
  dimmed,
  striped,
}: DemoAreaProps) {
  const style: CSSProperties = {
    flex: 1,
    position: 'relative',
    zIndex: 3,
    borderTopLeftRadius: 'calc(var(--ui-radius-md, 6px) - 1px)',
    borderTopRightRadius: 'calc(var(--ui-radius-md, 6px) - 1px)',
    overflow,
    padding: withPadding ? 'var(--ui-spacing-md, 16px)' : undefined,
    backgroundColor: dimmed ? 'light-dark(var(--ui-color-gray-0), var(--ui-color-dark-8))' : undefined,
    display: centered ? 'flex' : undefined,
    justifyContent: centered ? 'center' : undefined,
    alignItems: centered ? 'center' : undefined,
  };

  const innerStyle: CSSProperties = {
    maxWidth: maxWidth ? `${maxWidth}px` : '100%',
    minHeight: minHeight ? `${minHeight}px` : 'unset',
  };

  return (
    <Box style={style} mod={{ 'with-padding': withPadding, centered, dimmed, striped }}>
      <div style={innerStyle}>{children}</div>
    </Box>
  );
}
