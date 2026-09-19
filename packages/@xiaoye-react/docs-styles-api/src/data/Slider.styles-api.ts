import type { RangeSliderFactory, SliderFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const SliderStylesApi: StylesApiData<SliderFactory> = {
  selectors: {
    root: '根元素',
    track: '滑块轨道',
    bar: '轨道已填充部分',
    thumb: '滑块元素',
    label: '滑块标签',
    mark: '轨道上显示的标记',
    markLabel: '关联标记的标签，显示在轨道下方',
  },

  vars: {
    root: {
      '--slider-thumb-size': '控制滑块的 `width` 和 `height`',
      '--slider-track-height': '控制轨道的 `height`',
      '--slider-radius': '控制轨道和滑块的 `border-radius`',
      '--slider-color': '控制已填充轨道、滑块和标记的 `background`',
    },
  },

  modifiers: [
    {
      modifier: 'data-orientation',
      selector: 'root',
      condition: '决定滑块方向，默认为 `horizontal`',
    },
    {
      modifier: 'data-disabled',
      selector: ['track', 'bar', 'thumb', 'mark'],
      condition: '设置了 `disabled` 属性',
    },
    { modifier: 'data-inverted', selector: ['track', 'bar'], condition: '设置了 `inverted` 属性' },
    { modifier: 'data-dragging', selector: 'thumb', condition: '滑块正在被拖动' },
    {
      modifier: 'data-filled',
      selector: 'mark',
      condition: '标记位置小于或等于滑块值',
    },
  ],
};

export const RangeSliderStylesApi: StylesApiData<RangeSliderFactory> = SliderStylesApi;
