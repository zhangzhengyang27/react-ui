import { useState } from 'react';
import { Checkbox, Group, Text } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';
import classes from './Checkbox.demo.card.module.css';

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
          <Text className={classes.label}>mantine/core</Text>
          <Text className={classes.description}>
            Core components library: inputs, buttons, overlays, etc.
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
          <Text className={classes.label}>mantine/core</Text>
          <Text className={classes.description}>
            Core components library: inputs, buttons, overlays, etc.
          </Text>
        </div>
      </Group>
    </Checkbox.Card>
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
