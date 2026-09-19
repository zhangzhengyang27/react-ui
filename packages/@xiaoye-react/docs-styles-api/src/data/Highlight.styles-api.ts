import type { HighlightFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const HighlightStylesApi: StylesApiData<HighlightFactory> = {
  selectors: {
    root: '根元素',
    highlight: '匹配到的文本片段，渲染在 `Mark` 元素上',
  },

  vars: {},
};
