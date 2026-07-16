import type { PasswordInputFactory } from '@react-ui/ui';
import type { StylesApiData } from '../types';
import { InputStylesApi, InputWrapperStylesApi } from './Input.styles-api';

export const PasswordInputStylesApi: StylesApiData<PasswordInputFactory> = {
  selectors: {
    ...InputStylesApi.selectors,
    ...InputWrapperStylesApi.selectors,
    innerInput: 'Actual input 元素',
    visibilityToggle: 'Visibility toggle button',
  },

  vars: {
    root: {
      '--psi-button-size': '控制 visibility toggle button `width` and `height`',
      '--psi-icon-size': '控制 visibility toggle icon `width` and `height`',
    },
  },
};
