import type { MarqueeFactory } from '@react-ui/ui';
import type { StylesApiData } from '../types';

export const MarqueeStylesApi: StylesApiData<MarqueeFactory> = {
  selectors: {
    root: '根元素',
    content: 'Animated scrolling 容器',
    group: 'Repeated children 包装器',
  },

  vars: {
    root: {
      '--marquee-duration': '控制动画持续时间',
      '--marquee-gap': '控制项之间的间距',
      '--marquee-repeat': '内容重复次数',
      '--marquee-fade-color': '控制渐变边缘颜色',
      '--marquee-fade-size': '控制 the fade gradient 的 the size',
    },
  },

  modifiers: [
    {
      modifier: 'data-orientation',
      selector: 'root',
      value: 'horizontal | vertical',
      condition: 'Value depends on `orientation` prop',
    },
    { modifier: 'data-reverse', selector: 'root', condition: '设置了 `reverse` 属性' },
    { modifier: 'data-pause-on-hover', selector: 'root', condition: '设置了 `pauseOnHover` 属性' },
    {
      modifier: 'data-fade-edges',
      selector: 'root',
      condition: '`fadeEdges` prop is `true` (default)',
    },
  ],
};
