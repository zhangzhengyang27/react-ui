import type { AngleSliderFactory } from '@react-ui/ui';
import type { StylesApiData } from '../types';

export const AngleSliderStylesApi: StylesApiData<AngleSliderFactory> = {
  selectors: {
    root: '根元素',
    label: '滑块内的标签',
    marks: '所有标记的包装器',
    mark: 'Mark 元素',
    thumb: '滑块拇指',
  },

  vars: {
    root: {
      '--slider-size': '控制滑块宽度和高度',
      '--thumb-size': '控制拇指大小',
    },
  },

  modifiers: [{ modifier: 'disabled', selector: 'root', condition: '设置了 `disabled` 属性' }],
};
