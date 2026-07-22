import { Group } from '@xiaoye-react/ui';
import { DatePicker } from '@xiaoye-react/dates';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Group } from '@xiaoye-react/ui';
import { DatePicker } from '@xiaoye-react/dates';

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

export const defaultLevel: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
