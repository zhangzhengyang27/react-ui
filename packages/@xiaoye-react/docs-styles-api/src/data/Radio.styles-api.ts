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
    radio: 'Input element (`input[type="radio"]`)',
    icon: 'Radio icon, used to display checked icon',
    inner: 'Wrapper for `icon` and `input`',
    body: 'Input body，包含所有其他元素',
    labelWrapper: 'Contains `label`, `description` and `error`',
    label: '标签元素',
    description: '标签下方显示的描述',
    error: '标签下方显示的错误信息',
  },

  vars: {
    root: {
      '--radio-color': '控制 checked radio `background-color`',
      '--radio-radius': '控制 radio `border-radius`',
      '--radio-size': '控制 radio `width` and `height`',
      '--radio-icon-color': '控制 radio icon `color`',
      '--radio-icon-size': '控制 radio icon `width` and `height`',
    },
  },

  modifiers: [
    { modifier: 'data-error', selector: 'radio', condition: '设置了 `error` 属性' },
    { modifier: 'data-label-position', selector: 'inner', value: '`labelPosition` 属性的值' },
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
    icon: 'Radio icon',
  },

  vars: {
    indicator: RadioStylesApi.vars.root,
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
