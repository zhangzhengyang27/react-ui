import type {
  RadioCardFactory,
  RadioFactory,
  RadioGroupFactory,
  RadioIndicatorFactory,
} from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';
import { InputWrapperStylesApi } from './Input.styles-api';

export const RadioStylesApi: StylesApiData<RadioFactory> = {
  selectors: {
    root: '根元素',
    input: '输入元素（`input[type="radio"]`）',
    icon: 'Radio icon, used to display checked icon',
    inner: 'Wrapper for `icon` and `input`',
    body: 'Input body，包含所有其他元素',
    label: '标签元素',
    description: '标签下方显示的描述',
    error: '标签下方显示的错误信息',
    required: '标签内的必填星号元素',
  },

  vars: {
    root: {
      '--radio-size': '控制 radio `width` and `height`',
      '--radio-color': '控制 checked radio `background-color`',
      '--radio-icon-color': '控制 radio icon `color`',
    },
  },

  modifiers: [
    { modifier: 'data-error', selector: 'root', condition: '设置了 `error` 属性' },
    { modifier: 'data-disabled', selector: 'root', condition: '设置了 `disabled` 属性' },
    { modifier: 'data-with-label', selector: 'root', condition: '渲染了 `label` 内容' },
    { modifier: 'data-checked', selector: 'inner', condition: '设置了 `checked` 属性' },
  ],
};

export const RadioGroupStylesApi: StylesApiData<RadioGroupFactory> = {
  selectors: {
    ...InputWrapperStylesApi.selectors,
  },

  vars: {},
};

export const RadioIndicatorStylesApi: StylesApiData<RadioIndicatorFactory> = {
  selectors: {
    indicator: '根元素',
  },

  vars: {
    indicator: {
      '--radio-indicator-size': '控制 indicator `width` and `height`',
      '--radio-indicator-color': '控制 checked indicator `background-color`',
    },
  },

  modifiers: [
    { modifier: 'data-checked', selector: 'indicator', condition: '设置了 `checked` 属性' },
    { modifier: 'data-disabled', selector: 'indicator', condition: '设置了 `disabled` 属性' },
  ],
};

export const RadioCardStylesApi: StylesApiData<RadioCardFactory> = {
  selectors: {
    card: '根元素',
  },

  vars: {
    card: {
      '--card-radius': '控制 card `border-radius`',
    },
  },

  modifiers: [
    { modifier: 'data-checked', selector: 'card', condition: '设置了 `checked` 属性' },
    { modifier: 'data-with-border', selector: 'card', condition: '设置了 `withBorder` 属性' },
  ],
};
