import type { EmptyStateFactory } from '@react-ui/ui';
import type { StylesApiData } from '../types';

export const EmptyStateStylesApi: StylesApiData<EmptyStateFactory> = {
  selectors: {
    root: '根元素',
    body: 'Wrapper around `title`, `description` and `actions`',
    indicator: '图标或插图的包装器',
    title: '标题元素',
    description: '描述元素',
    actions: '操作按钮的包装器',
  },

  vars: {
    root: {
      '--empty-state-indicator-size': '控制指示器图标大小',
      '--empty-state-gap': '控制元素之间的间距',
      '--empty-state-title-fz': '控制 title `font-size`',
      '--empty-state-description-fz': '控制 description `font-size`',
      '--empty-state-indicator-bg':
        'Controls indicator background of `filled` and `light` variants',
      '--empty-state-indicator-color': '控制 indicator color of `filled` and `light` variants',
    },
  },

  modifiers: [
    {
      modifier: 'data-align',
      selector: 'root',
      value: 'Value of `align` prop',
    },
    {
      modifier: 'data-variant',
      selector: 'root',
      value: 'Value of `variant` prop',
    },
    {
      modifier: 'data-with-background',
      selector: 'indicator',
      condition: '`withIndicatorBackground` prop is set or `variant` is set',
    },
  ],
};
