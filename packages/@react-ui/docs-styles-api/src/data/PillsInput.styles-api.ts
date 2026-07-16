import type { PillsInputFactory, PillsInputFieldFactory } from '@react-ui/ui';
import type { StylesApiData } from '../types';
import { InputStylesApi, InputWrapperStylesApi } from './Input.styles-api';

export const PillsInputStylesApi: StylesApiData<PillsInputFactory> = {
  selectors: {
    ...InputStylesApi.selectors,
    ...InputWrapperStylesApi.selectors,
  },

  vars: {},
};

export const PillsInputFieldStylesApi: StylesApiData<PillsInputFieldFactory> = {
  selectors: {
    field: '根元素',
  },

  vars: {},

  modifiers: [
    { modifier: 'data-type', selector: 'field', value: 'Value of `type` prop' },
    { modifier: 'data-disabled', selector: 'field', condition: '设置了 `disabled` 属性' },
  ],
};
