import type { CarouselFactory } from '@xiaoye-react/carousel';
import type { StylesApiData } from '../types';

export const CarouselStylesApi: StylesApiData<CarouselFactory> = {
  selectors: {
    root: '根元素',
    slide: '`Carousel.Slide` root 元素',
    container: 'Slides 容器',
    viewport: 'Main element, contains slides container and all controls',
    controls: 'Next/previous controls 容器',
    control: 'Next/previous control',
    indicators: 'Indicators 容器',
    indicator: 'Indicator button',
  },

  vars: {
    root: {
      '--carousel-control-size': 'Controls `width` and `height` of the next/previous buttons',
      '--carousel-controls-offset': '控制 the next/previous buttons 的 offsets',
      '--carousel-height': '控制 the carousel 的 height',
    },
  },

  modifiers: [
    { modifier: 'data-orientation', selector: 'root', value: '`orientation` 属性的值' },
    {
      modifier: 'data-include-gap-in-size',
      selector: 'root',
      condition: '设置了 `includeGapInSize` 属性',
    },
    {
      modifier: 'data-inactive',
      selector: 'control',
      condition: 'No previous/next slides are available',
    },
    { modifier: 'data-active', selector: 'indicator', condition: 'Associated slide is active' },
  ],
};
