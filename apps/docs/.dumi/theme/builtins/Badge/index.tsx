import * as React from 'react';
import { Badge } from '@xiaoye-react/ui';
import type { BoxProps } from '@xiaoye-react/ui';

// https://github.com/umijs/dumi/blob/master/src/client/theme-default/builtins/Badge/index.tsx
interface BadgeProps {
  type: 'info' | 'warning' | 'error' | 'success';
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const colorMap: Record<BadgeProps['type'], string> = {
  info: 'blue',
  warning: 'orange',
  error: 'red',
  success: 'green',
};

const BadgeBuiltin: React.FC<BadgeProps> = (props) => {
  const { type = 'info', style, children } = props;
  return (
    <Badge
      variant="light"
      color={colorMap[type] as BoxProps['color']}
      style={{ verticalAlign: 'top', ...style }}
    >
      {children}
    </Badge>
  );
};

export default BadgeBuiltin;
