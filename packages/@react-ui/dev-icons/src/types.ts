import type { BoxProps, ElementProps } from '@react-ui/ui';

export interface DevIconProps extends BoxProps, ElementProps<'svg', 'display' | 'opacity'> {
  size?: number;
}
