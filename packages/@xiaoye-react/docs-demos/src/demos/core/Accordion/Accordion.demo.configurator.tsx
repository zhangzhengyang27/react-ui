import { Accordion, AccordionProps } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { data, dataCode } from './_base';

const code = `
import { Accordion } from '@xiaoye-react/ui';
import { data } from './data';

function Demo() {
  const items = data.map((item) => (
    <Accordion.Item key={item.value} value={item.value}>
      <Accordion.Control icon={item.emoji}>{item.value}</Accordion.Control>
      <Accordion.Panel>{item.description}</Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Accordion{{props}} order={3} defaultValue="Apples">
      {items}
    </Accordion>
  );
}
`;

function Demo(props: AccordionProps) {
  const items = data.map((item) => (
    <Accordion.Item key={item.value} value={item.value}>
      <Accordion.Control icon={item.emoji}>{item.value}</Accordion.Control>
      <Accordion.Panel>{item.description}</Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Accordion {...props} defaultValue="Apples" order={3} mih={320}>
      {items}
    </Accordion>
  );
}

export const configurator: UIDemo = {
  type: 'configurator',
  component: Demo,
  code: [
    { fileName: '演示代码.tsx', code, language: 'tsx' },
    { fileName: 'data.ts', code: dataCode, language: 'tsx' },
  ],
  controls: [
    {
      prop: 'variant',
      type: 'select',
      initialValue: 'default',
      libraryValue: 'default',
      data: [
        { label: 'Default', value: 'default' },
        { label: 'Contained', value: 'contained' },
        { label: '填充', value: 'filled' },
        { label: 'Separated', value: 'separated' },
        { label: 'Unstyled', value: 'unstyled' },
      ],
    },
    { prop: 'radius', type: 'size', libraryValue: 'md', initialValue: 'md' },
    {
      prop: 'chevronPosition',
      type: 'segmented',
      data: [
        { label: '左', value: 'left' },
        { label: '右', value: 'right' },
      ],
      initialValue: 'right',
      libraryValue: 'right',
    },
    {
      prop: 'chevronIconSize',
      type: 'number',
      initialValue: 16,
      libraryValue: 16,
      min: 12,
      max: 25,
    },
    { prop: 'disableChevronRotation', type: 'boolean', initialValue: false, libraryValue: false },
  ],
};
