import type { TreeSelectFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';
import { ComboboxLikeSelectors } from './Combobox.styles-api';
import { InputStylesApi, InputWrapperStylesApi } from './Input.styles-api';

export const TreeSelectStylesApi: StylesApiData<TreeSelectFactory> = {
  selectors: {
    ...InputStylesApi.selectors,
    ...InputWrapperStylesApi.selectors,
    ...ComboboxLikeSelectors,
    pill: '值标签',
    inputField: '输入字段',
    pillsList: '标签列表，同时包含输入字段',
  },

  vars: {},

  modifiers: [
    { modifier: 'data-combobox-selected', selector: 'option', condition: '选项被选中' },
    {
      modifier: 'data-combobox-active',
      selector: 'option',
      condition: '选项被键盘激活',
    },
    { modifier: 'data-combobox-disabled', selector: 'option', condition: '选项被禁用' },
  ],
};
