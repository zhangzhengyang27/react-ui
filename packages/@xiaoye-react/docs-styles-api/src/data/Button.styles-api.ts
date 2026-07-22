import type { ButtonFactory, ButtonGroupFactory, ButtonGroupSectionFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const ButtonStylesApi: StylesApiData<ButtonFactory> = {
  selectors: {
    root: '根元素',
    loader: '加载器组件，仅在设置 `loading` 属性时显示',
    inner: '包含所有其他元素，`root` 的子元素',
    section: '按钮的左侧和右侧区域',
    label: '按钮子元素',
  },

  vars: {
    root: {
      '--button-bg': '控制 `background`',
      '--button-bd': '控制 `border`',
      '--button-hover': '悬停时控制 `background`',
      '--button-color': '控制文本 `color`',
      '--button-hover-color': '悬停时控制文本 `color`',
      '--button-radius': '控制 `border-radius`',
      '--button-height': '控制按钮的 `height`',
      '--button-padding-x': '控制按钮的水平 `padding`',
      '--button-fz': '控制按钮的 `font-size`',
      '--button-justify': '控制 `inner` 元素的 `justify-content`',
    },
  },

  modifiers: [
    { modifier: 'data-disabled', selector: 'root', condition: '设置了 `disabled` 属性' },
    { modifier: 'data-loading', selector: ['root', 'label'], condition: '设置了 `loading` 属性' },
    { modifier: 'data-block', selector: 'root', condition: '设置了 `fullWidth` 属性' },
    { modifier: 'data-with-left-section', selector: 'root', condition: '设置了 `leftSection`' },
    { modifier: 'data-with-right-section', selector: 'root', condition: '设置了 `rightSection`' },
    { modifier: 'data-position', selector: 'section', value: '区域位置：左侧或右侧' },
  ],
};

export const ButtonGroupStylesApi: StylesApiData<ButtonGroupFactory> = {
  selectors: {
    group: '根元素',
  },

  vars: {
    group: {
      '--button-border-width': '子 `Button` 组件的 `border-width`',
    },
  },

  modifiers: [
    { modifier: 'data-orientation', selector: 'group', value: '`orientation` 属性的值' },
  ],
};

export const ButtonGroupSectionStylesApi: StylesApiData<ButtonGroupSectionFactory> = {
  selectors: {
    groupSection: '根元素',
  },

  vars: {
    groupSection: {
      '--section-bg': '控制 `background`',
      '--section-bd': '控制 `border`',
      '--section-color': '控制文本 `color`',
      '--section-radius': '控制 `border-radius`',
      '--section-height': '控制区域的 `height`',
      '--section-padding-x': '控制区域的水平 `padding`',
      '--section-fz': '控制区域的 `font-size`',
    },
  },

  modifiers: [],
};
