import type {
  CheckboxCardFactory,
  CheckboxFactory,
  CheckboxGroupFactory,
  CheckboxIndicatorFactory,
} from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';
import { InputWrapperStylesApi } from './Input.styles-api';

export const CheckboxStylesApi: StylesApiData<CheckboxFactory> = {
  selectors: {
    root: '根元素',
    input: '输入元素（`input[type="checkbox"]`）',
    icon: '复选框图标，用于显示对勾和不确定状态图标',
    inner: '`icon` 和 `input` 的包装器',
    body: '输入主体，包含所有其他元素',
    labelWrapper: '包含 `label`、`description` 和 `error`',
    label: '标签元素',
    description: '显示在标签下方的描述',
    error: '显示在标签下方的错误消息',
  },

  vars: {
    root: {
      '--checkbox-color': '控制选中复选框的 `background-color`',
      '--checkbox-radius': '控制复选框的 `border-radius`',
      '--checkbox-size': '控制复选框的 `width` 和 `height`',
      '--checkbox-icon-color': '控制复选框图标的 `color`',
    },
  },

  modifiers: [
    { modifier: 'data-checked', selector: 'root', condition: '设置了 `checked` 属性' },
    { modifier: 'data-error', selector: 'input', condition: '设置了 `error` 属性' },
    { modifier: 'data-indeterminate', selector: 'input', condition: '设置了 `indeterminate` 属性' },
    { modifier: 'data-label-position', selector: 'inner', value: '`labelPosition` 属性的值' },
  ],
};

export const CheckboxGroupStylesApi: StylesApiData<CheckboxGroupFactory> = {
  selectors: {
    ...InputWrapperStylesApi.selectors,
  },

  vars: {},
};

export const CheckboxIndicatorStylesApi: StylesApiData<CheckboxIndicatorFactory> = {
  selectors: {
    indicator: '根元素',
    icon: '复选框图标',
  },

  vars: {
    indicator: CheckboxStylesApi.vars.root,
  },

  modifiers: [
    { modifier: 'data-checked', selector: 'indicator', condition: '设置了 `checked` 属性' },
    { modifier: 'data-disabled', selector: 'indicator', condition: '设置了 `disabled` 属性' },
  ],
};

export const CheckboxCardStylesApi: StylesApiData<CheckboxCardFactory> = {
  selectors: {
    card: '根元素',
  },

  vars: {
    card: {
      '--card-radius': '控制卡片的 `border-radius`',
    },
  },

  modifiers: [
    { modifier: 'data-checked', selector: 'card', condition: '设置了 `checked` 属性' },
    { modifier: 'data-with-border', selector: 'card', condition: '设置了 `withBorder` 属性' },
  ],
};
