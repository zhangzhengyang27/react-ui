import type { BoxProps, ElementProps } from '@xiaoye-react/ui';

export interface DevIconProps extends BoxProps, ElementProps<'svg', 'display' | 'opacity'> {
  size?: number;
}
