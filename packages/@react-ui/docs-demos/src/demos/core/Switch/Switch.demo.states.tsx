import { Stack, Switch } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Switch, Stack } from '@react-ui/ui';

function Demo() {
  return (
    <Stack>
      <Switch value="value" label="Default switch" />
      <Switch checked value="value" label="Checked switch" />
      <Switch disabled value="value" label="Disabled switch" />
      <Switch checked disabled value="value" label="Disabled checked switch" />
    </Stack>
  );
}
`;

function Demo() {
  return (
    <Stack>
      <Switch checked={false} value="value" label="Default switch" />
      <Switch checked value="value" label="Checked switch" />
      <Switch disabled value="value" label="Disabled switch" />
      <Switch checked disabled value="value" label="Disabled checked switch" />
    </Stack>
  );
}

export const states: MantineDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
