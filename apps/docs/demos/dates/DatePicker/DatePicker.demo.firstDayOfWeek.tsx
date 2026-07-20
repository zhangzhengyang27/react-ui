import { Group } from '@react-ui/ui';
import { DatePicker } from '@react-ui/dates';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Group } from '@react-ui/ui';
import { DatePicker } from '@react-ui/dates';

function Demo() {
  return (
    <Group justify="center">
      <DatePicker firstDayOfWeek={0} />
      <DatePicker firstDayOfWeek={6} />
    </Group>
  );
}
`;

function Demo() {
  return (
    <Group justify="center">
      <DatePicker firstDayOfWeek={0} />
      <DatePicker firstDayOfWeek={6} />
    </Group>
  );
}

export const firstDayOfWeek: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
