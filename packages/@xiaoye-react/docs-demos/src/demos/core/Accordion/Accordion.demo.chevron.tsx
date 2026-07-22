import { PlusIcon } from '@phosphor-icons/react';
import { Accordion } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { data, dataCode } from './_base';
import classes from './Accordion.demo.chevron.module.css';

const code = `
import { PlusIcon } from '@phosphor-icons/react';
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
    <Accordion
      defaultValue="Apples"
      classNames={{ chevron: classes.chevron }}
      chevron={<PlusIcon className={classes.icon} />}
      order={3}
    >
      {items}
    </Accordion>
  );
}
`;

const cssCode = `
.chevron {
  &[data-rotate] {
    transform: rotate(45deg);
  }
}

.icon {
  width: 16px;
  height: 16px;
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
    <Accordion
      defaultValue="Apples"
      classNames={{ chevron: classes.chevron }}
      chevron={<PlusIcon className={classes.icon} />}
      order={3}
      mih={270}
    >
      {items}
    </Accordion>
  );
}

export const chevron: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: '演示代码.tsx', language: 'tsx', code },
    { fileName: '演示样式.module.css', code: cssCode, language: 'scss' },
    { fileName: 'data.ts', code: dataCode, language: 'tsx' },
  ],
  centered: true,
  maxWidth: 600,
};
