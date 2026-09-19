import type { SemiCircleProgressFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const SemiCircleProgressStylesApi: StylesApiData<SemiCircleProgressFactory> = {
  selectors: {
    root: '根元素',
    svg: 'Root svg 元素',
    emptySegment: '空白圆弧段',
    filledSegment: '填充圆弧段',
    label: '标签元素',
  },

  vars: {
    root: {
      '--semi-circle-progress-filled-segment-color': '填充段的颜色',
      '--semi-circle-progress-empty-segment-color': '空白段的颜色',
      '--semi-circle-progress-rotation':
        'Transform styles of the svg, controlled by `orientation` and `fillDirection` props',
      '--semi-circle-progress-thickness': 'Controls `strokeWidth` of the circle',
      '--semi-circle-progress-transition-duration': '控制 the filled segment 的 transition duration',
    },
  },

  modifiers: [
    { selector: 'label', modifier: 'data-position', value: '`labelPosition` 属性的值' },
    { selector: 'label', modifier: 'data-orientation', value: '`orientation` 属性的值' },
  ],
};
