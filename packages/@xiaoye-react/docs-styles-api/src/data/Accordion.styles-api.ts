import type { AccordionFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const AccordionStylesApi: StylesApiData<AccordionFactory> = {
  selectors: {
    root: '根元素',
    item: '`Accordion.Item` root 元素',
    control: '`Accordion.Control` root 元素',
    chevron: '`Accordion.Control` chevron container 元素',
    label: '`Accordion.Control` label',
    icon: '`Accordion.Control` icon',
    itemTitle: '`Accordion.Control` title (h2-h6) tag',
    panel: '`Accordion.Panel` root 元素',
    content: 'Wrapper element of `Accordion.Panel` `children`',
  },

  vars: {
    root: {
      '--accordion-chevron-size': '控制 chevron container 元素的 `width` 和 `min-width`',
      '--accordion-radius': '控制各元素的 `border-radius`，具体取决于变体',
      '--accordion-transition-duration': '控制所有动画的 `transition-duration`',
    },
  },

  modifiers: [
    {
      modifier: 'data-active',
      selector: ['item', 'control'],
      condition: 'Item is active (opened)',
    },
    {
      modifier: 'data-chevron-position',
      selector: 'control',
      value: 'Value of `chevronPosition` prop on `Accordion`',
    },
  ],
};
