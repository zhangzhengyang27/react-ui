import type { PasswordInputFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';
import { InputStylesApi, InputWrapperStylesApi } from './Input.styles-api';

export const PasswordInputStylesApi: StylesApiData<PasswordInputFactory> = {
  selectors: {
    ...InputStylesApi.selectors,
    ...InputWrapperStylesApi.selectors,
    placeholder: '输入框占位内容（`Input.Placeholder`）',
    visibilityToggle: 'Visibility toggle button',
  },

  vars: {},
};
