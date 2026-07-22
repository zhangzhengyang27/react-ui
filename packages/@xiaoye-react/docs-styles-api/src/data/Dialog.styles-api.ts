import type { DialogFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const DialogStylesApi: StylesApiData<DialogFactory> = {
  selectors: {
    root: '根元素',
    closeButton: '关闭按钮',
  },

  vars: {
    root: {
      '--dialog-size': 'Controls `width` of the dialog',
    },
  },
};
