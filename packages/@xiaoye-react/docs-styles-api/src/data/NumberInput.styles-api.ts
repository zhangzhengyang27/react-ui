import type { NumberInputFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';
import { InputStylesApi, InputWrapperStylesApi } from './Input.styles-api';

export const NumberInputStylesApi: StylesApiData<NumberInputFactory> = {
  selectors: {
    ...InputStylesApi.selectors,
    ...InputWrapperStylesApi.selectors,
    controls: 'Increment and decrement buttons 包装器',
    control: 'Increment and decrement buttons',
  },

  vars: {
    controls: {
      '--ni-chevron-size': 'Controls `width` and `height` of the default chevron icon',
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
