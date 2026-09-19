import type { TextareaFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';
import { InputStylesApi, InputWrapperStylesApi } from './Input.styles-api';

export const TextareaStylesApi: StylesApiData<TextareaFactory> = {
  selectors: {
    ...InputStylesApi.selectors,
    ...InputWrapperStylesApi.selectors,
    fieldSizing: 'autosize 变体，`field-sizing: content` 让高度随内容增长',
  },

  vars: {},
};
