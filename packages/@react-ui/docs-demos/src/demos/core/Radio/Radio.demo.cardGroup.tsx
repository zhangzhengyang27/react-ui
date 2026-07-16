import { useState } from 'react';
import { Group, Radio, Stack, Text } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import classes from './Radio.demo.card.module.css';

const cssCode = `.root {
  position: relative;
  padding: var(--ui-spacing-md);
  transition: border-color 150ms ease;

  &[data-checked] {
    border-color: var(--ui-primary-color-filled);
  }

  &:hover {
    [data-ui-color-scheme='light'] & {
      background-color: var(--ui-color-gray-0);
    }

    [data-ui-color-scheme='dark'] & {
      background-color: var(--ui-color-dark-6);
    }
  }
}

.label {
  font-family: var(--ui-font-family-monospace);
  font-weight: bold;
  font-size: var(--ui-font-size-md);
  line-height: 1.3;
  color: var(--ui-color-bright);
}

.description {
  margin-top: 8px;
  color: var(--ui-color-dimmed);
  font-size: var(--ui-font-size-xs);
}
`;

const code = `
import { useState } from 'react';
import { Radio, Group, Stack, Text } from '@react-ui/ui';
import classes from './Demo.module.css';

const data = [
  {
    name: '@react-ui/ui',
    description: '核心组件库：输入、按钮、浮层等',
  },
  { name: '@react-ui/hooks', description: '用于 React 应用的可复用 Hooks 集合。' },
  { name: '@react-ui/notifications', description: '通知系统' },
];

function Demo() {
  const [value, setValue] = useState<string | null>(null);

  const cards = data.map((item) => (
    <Radio.Card className={classes.root} value={item.name} key={item.name}>
      <Group wrap="nowrap" align="flex-start">
        <Radio.Indicator />
        <div>
          <Text className={classes.label}>{item.name}</Text>
          <Text className={classes.description}>{item.description}</Text>
        </div>
      </Group>
    </Radio.Card>
  ));

  return (
    <>
      <Radio.Group
        value={value}
        onChange={setValue}
        label="选择一个要安装的包"
        description="选择一个你的应用需要的包"
      >
        <Stack pt="md" gap="xs">
          {cards}
        </Stack>
      </Radio.Group>

      <Text fz="xs" mt="md">
        当前值：{value || '–'}
      </Text>
    </>
  );
}
`;

const data = [
  {
    name: '@react-ui/ui',
    description: '核心组件库：输入、按钮、浮层等',
  },
  { name: '@react-ui/hooks', description: '用于 React 应用的可复用 Hooks 集合。' },
  { name: '@react-ui/notifications', description: '通知系统' },
];

function Demo() {
  const [value, setValue] = useState<string | null>(null);

  const cards = data.map((item) => (
    <Radio.Card className={classes.root} value={item.name} key={item.name}>
      <Group wrap="nowrap" align="flex-start">
        <Radio.Indicator />
        <div>
          <Text className={classes.label}>{item.name}</Text>
          <Text className={classes.description}>{item.description}</Text>
        </div>
      </Group>
    </Radio.Card>
  ));

  return (
    <>
      <Radio.Group
        value={value}
        onChange={setValue}
        label="选择一个要安装的包"
        description="选择一个你的应用需要的包"
      >
        <Stack pt="md" gap="xs">
          {cards}
        </Stack>
      </Radio.Group>

      <Text fz="xs" mt="md">
        当前值：{value || '–'}
      </Text>
    </>
  );
}

export const cardGroup: UIDemo = {
  type: 'code',
  centered: true,
  maxWidth: 320,
  component: Demo,
  defaultExpanded: false,
  code: [
    { fileName: '演示代码.tsx', language: 'tsx', code },
    { fileName: '演示样式.module.css', language: 'scss', code: cssCode },
  ],
};
