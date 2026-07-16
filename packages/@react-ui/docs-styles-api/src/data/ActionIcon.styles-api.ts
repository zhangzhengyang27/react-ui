import type { ActionIconFactory, ActionIconGroupFactory } from '@react-ui/ui';
import type { StylesApiData } from '../types';

export const ActionIconStylesApi: StylesApiData<ActionIconFactory> = {
  selectors: {
    root: '根元素',
    loader: '`Loader` component, rendered inside root element when `loading` prop is set',
    icon: 'Inner icon 包装器',
  },

  vars: {
    root: {
      '--ai-bg': '控制 `background`',
      '--ai-hover': 'Controls `background` when hovered',
      '--ai-bd': '控制 `border`',
      '--ai-color': '控制 icon `color`',
      '--ai-hover-color': '控制 icon `color` when hovered',
      '--ai-radius': '控制 `border-radius`',
      '--ai-size': '控制 `width`、`height`、`min-width` 和 `min-height` 样式',
    },
  },

  modifiers: [
    { modifier: 'data-disabled', selector: 'root', condition: '设置了 `disabled` 属性' },
    { modifier: 'data-loading', selector: ['root', 'icon'], condition: '设置了 `loading` 属性' },
  ],
};

export const ActionIconGroupStylesApi: StylesApiData<ActionIconGroupFactory> = {
  selectors: {
    group: '根元素',
  },

  vars: {
    group: {
      '--ai-border-width':
        'Controls `border-width` of child ActionIcon components that are placed beside one another',
    },
  },

  modifiers: [
    { modifier: 'data-orientation', selector: 'group', value: '`orientation` 属性的值' },
  ],
};
