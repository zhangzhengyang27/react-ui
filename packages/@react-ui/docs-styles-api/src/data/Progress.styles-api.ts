import type { ProgressFactory } from '@react-ui/ui';
import type { StylesApiData } from '../types';

export const ProgressStylesApi: StylesApiData<ProgressFactory> = {
  selectors: {
    root: '根元素',
    section: '`Progress.Section` root 元素',
    label: '`Progress.Label` root 元素',
  },

  vars: {
    root: {
      '--progress-radius': 'Controls `border-radius` of track and sections',
      '--progress-size': '控制 progress bar 的 height',
      '--progress-transition-duration': '控制 width `transition-duration` of progress bar',
    },
  },

  modifiers: [
    {
      modifier: 'data-orientation',
      selector: 'root',
      value: 'vertical | horizontal',
      condition: '`orientation` prop',
    },
    {
      modifier: 'data-striped',
      selector: 'section',
      condition: '`striped` or `animated` props are set',
    },
    { modifier: 'data-animated', selector: 'section', condition: '设置了 `animated` 属性' },
  ],
};
