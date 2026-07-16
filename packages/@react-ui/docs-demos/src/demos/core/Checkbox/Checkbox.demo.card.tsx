import { useState } from 'react';
import { Checkbox, Group, Text } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
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
import { Checkbox, Group, Text } from '@react-ui/ui';
import classes from './Demo.module.css';

function Demo() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox.Card
      className={classes.root}
      checked={checked}
      onClick={() => setChecked((c) => !c)}
    >
      <Group wrap="nowrap" align="flex-start">
        <Checkbox.Indicator />

        <div>
          <Text className={classes.label}>@react-ui/ui</Text>
          <Text className={classes.description}>
            核心组件库：输入框、按钮、遮罩层等。
          </Text>
        </div>
      </Group>
    </Checkbox.Card>
  );
}
`;

function Demo() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox.Card className={classes.root} checked={checked} onClick={() => setChecked((c) => !c)}>
      <Group wrap="nowrap" align="flex-start">
        <Checkbox.Indicator />

        <div>
          <Text className={classes.label}>@react-ui/ui</Text>
          <Text className={classes.description}>
            核心组件库：输入框、按钮、遮罩层等。
          </Text>
        </div>
      </Group>
    </Checkbox.Card>
  );
}

export const card: UIDemo = {
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
