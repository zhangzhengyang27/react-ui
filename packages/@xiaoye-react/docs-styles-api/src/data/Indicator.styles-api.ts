import type { IndicatorFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const IndicatorStylesApi: StylesApiData<IndicatorFactory> = {
  selectors: {
    root: '根元素',
    indicator: 'Indicator 元素',
  },

  vars: {
    root: {
      '--indicator-bottom': 'Controls `bottom` style',
      '--indicator-inline-start': 'Controls `inset-inline-start` style',
      '--indicator-inline-end': 'Controls `inset-inline-end` style',
      '--indicator-top': 'Controls `top` style',
      '--indicator-radius': '控制 `border-radius`',
      '--indicator-size': 'Controls `min-width` and `height`',
      '--indicator-translate-x': 'Controls `translateX` style, used for positioning',
      '--indicator-translate-y': 'Controls `translateY` style, used for positioning',
      '--indicator-z-index': 'Controls `z-index` style',
      '--indicator-color': '控制 `background-color`',
      '--indicator-text-color': '控制 `color`',
    },
  },

  modifiers: [
    { modifier: 'data-inline', selector: 'root', condition: '设置了 `inline` 属性' },
    { modifier: 'data-with-label', selector: 'indicator', condition: '设置了 `label` 属性' },
    { modifier: 'data-with-border', selector: 'indicator', condition: '设置了 `withBorder` 属性' },
    { modifier: 'data-processing', selector: 'indicator', condition: '设置了 `processing` 属性' },
  ],
};
