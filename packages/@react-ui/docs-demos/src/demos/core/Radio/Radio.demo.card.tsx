import { useState } from 'react';
import { Group, Radio, Text } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';
import classes from './Radio.demo.card.module.css';

const cssCode = `.root {
  position: relative;
  padding: var(--ui-spacing-md);
  transition: border-color 150ms ease;

  &[data-checked] {
    border-color: var(--ui-primary-color-filled);
  }

  @mixin hover {
    @mixin light {
      background-color: var(--ui-color-gray-0);
    }

    @mixin dark {
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
import { Radio, Group, Text } from '@react-ui/ui';
import classes from './Demo.module.css';

function Demo() {
  const [checked, setChecked] = useState(false);

  return (
    <Radio.Card
      className={classes.root}
      checked={checked}
      onClick={() => setChecked((c) => !c)}
    >
      <Group wrap="nowrap" align="flex-start">
        <Radio.Indicator />
        <div>
          <Text className={classes.label}>@react-ui/ui</Text>
          <Text className={classes.description}>
            Core components library: inputs, buttons, overlays, etc.
          </Text>
        </div>
      </Group>
    </Radio.Card>
  );
}
`;

function Demo() {
  const [checked, setChecked] = useState(false);

  return (
    <Radio.Card className={classes.root} checked={checked} onClick={() => setChecked((c) => !c)}>
      <Group wrap="nowrap" align="flex-start">
        <Radio.Indicator />
        <div>
          <Text className={classes.label}>@react-ui/ui</Text>
          <Text className={classes.description}>
            Core components library: inputs, buttons, overlays, etc.
          </Text>
        </div>
      </Group>
    </Radio.Card>
  );
}

export const card: MantineDemo = {
  type: 'code',
  centered: true,
  maxWidth: 320,
  component: Demo,
  defaultExpanded: false,
  code: [
    { fileName: 'Demo.tsx', language: 'tsx', code },
    { fileName: 'Demo.module.css', language: 'scss', code: cssCode },
  ],
};
