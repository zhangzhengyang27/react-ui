import { Accordion } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { data, dataCode } from './_base';
import classes from './Accordion.demo.customize.module.css';

const code = `
import { Accordion } from '@xiaoye-react/ui';
import { data } from './data';
import classes from './Demo.module.css';

function Demo() {
  const items = data.map((item) => (
    <Accordion.Item key={item.value} value={item.value}>
      <Accordion.Control icon={item.emoji}>{item.value}</Accordion.Control>
      <Accordion.Panel>{item.description}</Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Accordion defaultValue="Apples" classNames={classes} variant="filled" order={3}>
      {items}
    </Accordion>
  );
}
`;

const cssCode = `.root {
  border-radius: var(--ui-radius-sm);
  background-color: light-dark(var(--ui-color-gray-0), var(--ui-color-dark-6));
}

.item {
  background-color: light-dark(var(--ui-color-gray-0), var(--ui-color-dark-6));
  border: 1px solid transparent;
  position: relative;
  z-index: 0;
  transition: transform 150ms ease;

  &[data-active] {
    transform: scale(1.03);
    z-index: 1;
    background-color: var(--ui-color-body);
    border-color: light-dark(var(--ui-color-gray-2), var(--ui-color-dark-4));
    box-shadow: var(--ui-shadow-md);
    border-radius: var(--ui-radius-md);
  }
}

.chevron {
  &[data-rotate] {
    transform: rotate(-90deg);
  }
}
`;

function Demo() {
  const items = data.map((item) => (
    <Accordion.Item key={item.value} value={item.value}>
      <Accordion.Control icon={item.emoji}>{item.value}</Accordion.Control>
      <Accordion.Panel>{item.description}</Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Accordion defaultValue="Apples" classNames={classes} variant="filled" order={3}>
      {items}
    </Accordion>
  );
}

export const customize: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: '演示代码.tsx', language: 'tsx', code },
    { fileName: '演示样式.module.css', code: cssCode, language: 'scss' },
    { fileName: 'data.ts', code: dataCode, language: 'tsx' },
  ],
  centered: true,
  maxWidth: 500,
};
