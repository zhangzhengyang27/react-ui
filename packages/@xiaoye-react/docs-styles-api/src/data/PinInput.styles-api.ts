import { PinInputFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const PinInputStylesApi: StylesApiData<PinInputFactory> = {
  selectors: {
    root: '根元素',
    pinInput: 'Input item 包装器',
    input: '输入元素',
  },

  vars: {
    root: {
      '--pin-input-size': '控制 input `width` and `height`',
    },
  },

  modifiers: [],
};
