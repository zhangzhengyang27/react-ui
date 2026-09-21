// 直连实现文件而不是 color-functions 桶文件：桶里有 `export { getContrastColor } from './get-contrast-color'`，
// 而 get-contrast-color 又 import 本文件 —— 走桶就构成 index → get-contrast-color → virtual-color → index 的环。
// 全部代码打成一个 bundle 时环被 rollup 线性化掉，改成 preserveModules 后变成跨 chunk 循环依赖，
// rollup 会直接警告 "likely lead to broken execution order"（本文件参与主题变量初始化，顺序敏感）。
import { colorsTuple } from '../../color-functions/colors-tuple/colors-tuple';
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
