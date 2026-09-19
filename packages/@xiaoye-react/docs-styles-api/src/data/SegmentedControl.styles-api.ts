import type { SegmentedControlFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const SegmentedControlStylesApi: StylesApiData<SegmentedControlFactory> = {
  selectors: {
    root: '根元素',
    control: 'Wrapper element for input and label',
    input: 'Input element (`input[type="radio"]`), hidden by default',
    label: 'Label element associated with input',
  },

  vars: {
    root: {
      '--sc-radius': 'Controls `border-radius` of items and `root` element',
      '--sc-size': 'Controls `height` and `min-height` of control',
      '--sc-color': 'Control `background-color` of selected item',
      '--sc-transition-duration':
        'Controls `transition-duration` of various elements that have animations',
    },
  },

  modifiers: [
    { modifier: 'data-full-width', selector: 'root', condition: '设置了 `fullWidth` 属性' },
    {
      modifier: 'data-with-items-borders',
      selector: 'root',
      condition: '`withItemsBorders` prop is not `false`',
    },
    { modifier: 'data-disabled', selector: 'root', condition: 'Value of `disabled` prop' },
    { modifier: 'data-orientation', selector: 'control', value: '`orientation` 属性的值' },
    {
      modifier: 'data-active',
      selector: ['label', 'control'],
      condition: 'Associated input is checked',
    },
    { modifier: 'data-disabled', selector: 'label', condition: 'Associated input is disabled' },
    { modifier: 'data-read-only', selector: 'label', condition: '设置了 `readOnly` 属性' },
  ],
};
