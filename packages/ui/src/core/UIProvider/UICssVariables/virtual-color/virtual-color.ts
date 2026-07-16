import { colorsTuple } from '../../color-functions';
import { UIColor, UIColorsTuple } from '../../theme.types';

interface VirtualColorInput {
  dark: UIColor;
  light: UIColor;
  name: string;
}

type VirtualColor = UIColorsTuple & {
  'ui-virtual-color': true;
  name: string;
  dark: UIColor;
  light: UIColor;
};

export function virtualColor(input: VirtualColorInput): UIColorsTuple {
  const result = colorsTuple(
    Array.from({ length: 10 }).map((_, i) => `var(--ui-color-${input.name}-${i})`)
  );

  Object.defineProperty(result, 'ui-virtual-color', {
    enumerable: false,
    writable: false,
    configurable: false,
    value: true,
  });

  Object.defineProperty(result, 'dark', {
    enumerable: false,
    writable: false,
    configurable: false,
    value: input.dark,
  });

  Object.defineProperty(result, 'light', {
    enumerable: false,
    writable: false,
    configurable: false,
    value: input.light,
  });

  Object.defineProperty(result, 'name', {
    enumerable: false,
    writable: false,
    configurable: false,
    value: input.name,
  });

  return result;
}

export function isVirtualColor(value: unknown): value is VirtualColor {
  return !!value && typeof value === 'object' && 'ui-virtual-color' in value;
}
