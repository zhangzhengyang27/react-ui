import type { TreeSelectFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';
import { ComboboxLikeSelectors } from './Combobox.styles-api';
import { InputStylesApi, InputWrapperStylesApi } from './Input.styles-api';

export const TreeSelectStylesApi: StylesApiData<TreeSelectFactory> = {
  selectors: {
    ...InputStylesApi.selectors,
    ...InputWrapperStylesApi.selectors,
    ...ComboboxLikeSelectors,
    arrow: '`comboboxProps.withArrow` 时下拉层指向触发元素的箭头',
    optionLabel: '`Combobox.Option` 的标签样式名，当前渲染未使用',
    header: '下拉框顶部区域（`Combobox.Header`）',
    footer: '下拉框底部区域（`Combobox.Footer`）',
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
