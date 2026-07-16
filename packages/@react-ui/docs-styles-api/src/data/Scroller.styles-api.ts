import type { ScrollerFactory } from '@react-ui/ui';
import type { StylesApiData } from '../types';

export const ScrollerStylesApi: StylesApiData<ScrollerFactory> = {
  selectors: {
    root: '根元素',
    container: 'Scrollable 容器',
    content: 'Wraps component children',
    control: 'Start and end scroll control buttons',
    chevron: 'Chevron icon inside controls',
  },

  vars: {
    root: {
      '--scroller-control-size': 'Controls width and chevron size',
      '--scroller-background-color': 'Background color for the control edge gradients',
    },
  },

  modifiers: [
    {
      modifier: 'data-draggable',
      selector: 'container',
      condition: '设置了 `draggable` 属性',
    },
    {
      modifier: 'data-position',
      selector: 'control',
      value: '"start" or "end" depending on control position',
    },
    {
      modifier: 'data-hidden',
      selector: 'control',
      condition: 'Control is hidden because scrolling is not available in that direction',
    },
  ],
};
