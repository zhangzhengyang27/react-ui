import type { NativeSelectFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';
import { InputStylesApi, InputWrapperStylesApi } from './Input.styles-api';

export const NativeSelectStylesApi: StylesApiData<NativeSelectFactory> = {
  selectors: {
    ...InputWrapperStylesApi.selectors,
    ...InputStylesApi.selectors,
  },

  vars: {
    root: {
      '--native-select-chevron-size': 'Controls `width` and `height` of the default chevron icon',
    },
  },
};
