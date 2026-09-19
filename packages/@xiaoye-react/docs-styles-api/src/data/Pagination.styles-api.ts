import type { PaginationFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const PaginationStylesApi: StylesApiData<PaginationFactory> = {
  selectors: {
    root: '根元素',
    control: 'Control element: items, next/previous, first/last buttons',
    dots: 'Dots icon 包装器',
    items: 'Wrapper around page number controls, used with `layout="responsive"`',
    label: 'Compact label element displayed in narrow containers with `layout="responsive"`',
  },

  vars: {
    root: {
      '--pagination-control-bg': 'Active control `background-color`',
      '--pagination-control-color': 'Active control `color`',
      '--pagination-control-fz': '控制 `font-size`',
      '--pagination-control-radius': '控制 control `border-radius`',
      '--pagination-control-size': '控制 control `min-width` and `height`',
    },
  },

  modifiers: [
    { modifier: 'data-active', selector: 'control', condition: 'Control is active' },
    { modifier: 'data-disabled', selector: 'control', condition: 'Control is disabled' },
    {
      modifier: 'data-layout',
      selector: 'root',
      value: 'Value of `layout` prop',
    },
  ],
};
