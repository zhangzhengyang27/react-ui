import { useState } from 'react';
import { Checkbox, Group, Stack, Text } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import classes from './Checkbox.demo.card.module.css';

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
  font-weight: 600;
  font-size: var(--ui-font-size-sm);
  line-height: 1.3;
  color: var(--ui-color-bright);
}

.description {
  margin-top: 4px;
  color: var(--ui-color-dimmed);
  font-size: var(--ui-font-size-xs);
}
`;

const code = `
import { useState } from 'react';
import { Checkbox, Group, Stack, Text } from '@xiaoye-react/ui';
import classes from './Demo.module.css';

const data = [
  {
    name: '@xiaoye-react/ui',
    description: '核心组件库：输入框、按钮、遮罩层等。',
  },
  { name: '@xiaoye-react/hooks', description: '用于 React 应用的可复用 Hooks 集合。' },
  { name: '@xiaoye-react/notifications', description: '通知系统' },
];

function Demo() {
  const [value, setValue] = useState<string[]>([]);

  const cards = data.map((item) => (
    <Checkbox.Card className={classes.root} value={item.name} key={item.name}>
      <Group wrap="nowrap" align="flex-start">
        <Checkbox.Indicator />
        <div>
          <Text className={classes.label}>{item.name}</Text>
          <Text className={classes.description}>{item.description}</Text>
        </div>
      </Group>
    </Checkbox.Card>
  ));

  return (
    <>
      <Checkbox.Group
        value={value}
        onChange={setValue}
        label="选择要安装的包"
        description="选择你的应用需要的所有包"
      >
        <Stack pt="md" gap="xs">
          {cards}
        </Stack>
      </Checkbox.Group>

      <Text fz="xs" mt="md">
        当前值：{value.join(', ') || '–'}
      </Text>
    </>
  );
}
`;

const data = [
  {
    name: '@xiaoye-react/ui',
    description: '核心组件库：输入框、按钮、遮罩层等。',
  },
  { name: '@xiaoye-react/hooks', description: '用于 React 应用的可复用 Hooks 集合。' },
  { name: '@xiaoye-react/notifications', description: '通知系统' },
];

function Demo() {
  const [value, setValue] = useState<string[]>([]);

  const cards = data.map((item) => (
    <Checkbox.Card className={classes.root} value={item.name} key={item.name}>
      <Group wrap="nowrap" align="flex-start">
        <Checkbox.Indicator />
        <div>
          <Text className={classes.label}>{item.name}</Text>
          <Text className={classes.description}>{item.description}</Text>
        </div>
      </Group>
    </Checkbox.Card>
  ));

  return (
    <>
      <Checkbox.Group
        value={value}
        onChange={setValue}
        label="选择要安装的包"
        description="选择你的应用需要的所有包"
      >
        <Stack pt="md" gap="xs">
          {cards}
        </Stack>
      </Checkbox.Group>

      <Text fz="xs" mt="md">
        当前值：{value.join(', ') || '–'}
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
