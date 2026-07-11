import { Group, Radio } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Radio, Group } from '@react-ui/ui';

function Demo() {
  return (
    <Group>
      <Radio checked disabled label="React" value="react" />
      <Radio disabled label="Angular" value="nu" />
      <Radio disabled label="Svelte" value="sv" />
    </Group>
  );
}
`;

function Demo() {
  return (
    <Group>
      <Radio checked disabled label="React" value="react" />
      <Radio disabled label="Angular" value="nu" />
      <Radio disabled label="Svelte" value="sv" />
    </Group>
  );
}

export const disabled: MantineDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
