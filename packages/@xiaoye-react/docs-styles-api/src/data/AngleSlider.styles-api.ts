import type { AngleSliderFactory } from '@xiaoye-react/ui';
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
      '--angle-slider-size': '控制滑块的 `width` 和 `height`',
      '--angle-slider-thumb-size': '控制拇指的 `width` 和 `height`',
    },
  },

  modifiers: [{ modifier: 'disabled', selector: 'root', condition: '设置了 `disabled` 属性' }],
};
