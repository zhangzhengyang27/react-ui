import type { DividerFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const DividerStylesApi: StylesApiData<DividerFactory> = {
  selectors: {
    root: '根元素',
    label: '标签元素',
  },

  vars: {
    root: {
      '--divider-border-style': '控制 `border-style`',
      '--divider-color': '控制 `border-color`',
      '--divider-size': '控制 `border-width`',
    },
  },

  modifiers: [
    { modifier: 'data-with-label', selector: 'root', condition: '`label` prop is truthy' },
    { modifier: 'data-orientation', selector: 'root', value: '`orientation` 属性的值' },
    { modifier: 'data-position', selector: 'label', value: '`labelPosition` 属性的值' },
  ],
};
