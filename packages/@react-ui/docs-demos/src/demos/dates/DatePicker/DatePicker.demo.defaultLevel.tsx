import { Group } from '@react-ui/ui';
import { DatePicker } from '@react-ui/dates';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Group } from '@react-ui/ui';
import { DatePicker } from '@react-ui/dates';

function Demo() {
  return (
    <Group justify="center">
      <DatePicker defaultLevel="decade" />
      <DatePicker defaultLevel="year" />
    </Group>
  );
}
`;

function Demo() {
  return (
    <Group justify="center">
      <DatePicker defaultLevel="decade" />
      <DatePicker defaultLevel="year" />
    </Group>
  );
}

export const defaultLevel: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
