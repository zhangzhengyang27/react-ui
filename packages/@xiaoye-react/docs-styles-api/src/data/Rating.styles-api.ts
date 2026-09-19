import type { RatingFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const RatingStylesApi: StylesApiData<RatingFactory> = {
  selectors: {
    root: '根元素',
    star: '单颗星（label 元素），包含 `input` 和符号',
    starSymbol: '星形符号元素（默认为星星图标，也可自定义）',
    input: 'Item input, hidden by default',
  },

  vars: {
    root: {
      '--rating-size':
        'Controls star icon width and height. Can use theme size or custom CSS value.',
      '--rating-color': 'Controls filled star icon color',
    },
  },

  modifiers: [
    { modifier: 'data-readonly', selector: 'root', condition: '设置了 `readOnly` 属性' },
    {
      modifier: 'data-filled',
      selector: 'star',
      condition: '该星对应的值小于或等于当前值',
    },
  ],
};
