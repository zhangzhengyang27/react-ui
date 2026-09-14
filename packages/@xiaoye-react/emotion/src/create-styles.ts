import { em, UIBreakpoint, UITheme, px, useUITheme } from '@xiaoye-react/ui';
import { useGuaranteedMemo } from './use-guaranteed-memo';
import { CSSObject } from './types';
import { useCss } from './use-css';

export function getStylesRef(refName: string) {
  return `___ref-${refName || ''}`;
}

function getBreakpointValue(theme: UITheme, breakpoint: UIBreakpoint | number) {
  return breakpoint in theme.breakpoints && typeof breakpoint !== 'number'
    ? (px(theme.breakpoints[breakpoint]) as number)
    : (px(breakpoint) as number);
}

export const getHelpers = (theme: UITheme) => ({
  light: '[data-ui-color-scheme="light"] &',
  dark: '[data-ui-color-scheme="dark"] &',
  rtl: '[dir="rtl"] &',
  ltr: '[dir="ltr"] &',
  notRtl: '[dir="ltr"] &',
  notLtr: '[dir="rtl"] &',
  ref: getStylesRef,
  smallerThan: (breakpoint: UIBreakpoint | number) =>
    `@media (max-width: ${em(getBreakpointValue(theme, breakpoint) - 0.1)})`,
  largerThan: (breakpoint: UIBreakpoint | number) =>
    `@media (min-width: ${em(getBreakpointValue(theme, breakpoint))})`,
});

export type EmotionHelpers = ReturnType<typeof getHelpers>;

export function createStyles<
  Key extends string = string,
  Params = void,
  Input extends Record<Key, CSSObject> = Record<Key, CSSObject>,
>(input: ((theme: UITheme, params: Params, helpers: EmotionHelpers) => Input) | Input) {
  const getCssObject = typeof input === 'function' ? input : () => input;

  return function useStyles(params: Params) {
    const theme = useUITheme();
    const helpers = getHelpers(theme);
    const { css, cx } = useCss();
    // cssObject 按 (theme, params) memo：父组件频繁重渲染时不再对每个样式 key
    // 重复执行 serializeStyles（结果 hash 相同时 emotion 仅做字符串比较，依然有开销）
    const cssObject = useGuaranteedMemo(
      () => getCssObject(theme, params, helpers) as Record<string, any>,
      [theme, params]
    );
    const classes = Object.keys(cssObject).reduce<Record<string, string>>((acc, key) => {
      acc[key] = css(cssObject[key]);
      return acc;
    }, {}) as { [key in keyof Input]: string };

    return { classes, cx, theme };
  };
}
