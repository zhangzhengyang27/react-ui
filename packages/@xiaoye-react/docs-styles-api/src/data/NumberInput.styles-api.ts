import type { NumberInputFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';
import { InputStylesApi, InputWrapperStylesApi } from './Input.styles-api';

export const NumberInputStylesApi: StylesApiData<NumberInputFactory> = {
  selectors: {
    ...InputStylesApi.selectors,
    ...InputWrapperStylesApi.selectors,
    control: 'Increment and decrement buttons',
    icon: '控制按钮内的 chevron 图标',
  },

  vars: {
    root: {
      '--ni-control-width': 'Controls `width` of increment and decrement buttons',
    },
  },

  modifiers: [
    {
      modifier: 'data-direction',
      selector: 'control',
      value: '`up` or `down` depending on the control',
    },
  ],
};
