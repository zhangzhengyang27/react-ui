import { Checkbox, Stack } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Checkbox, Stack } from '@react-ui/ui';

function Demo() {
  return (
    <Stack>
      <Checkbox label="With boolean error" error />
      <Checkbox label="With error message" error="Must be checked" />
      <Checkbox label="With error message" error="No error styles" withErrorStyles={false} />
    </Stack>
  );
}
`;

function Demo() {
  return (
    <Stack>
      <Checkbox label="With boolean error" error />
      <Checkbox label="With error message" error="Must be checked" />
      <Checkbox label="With error message" error="No error styles" withErrorStyles={false} />
    </Stack>
  );
}

export const error: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
