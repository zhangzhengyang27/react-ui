import { Group } from '@xiaoye-react/ui';
import { DatePicker } from '@xiaoye-react/dates';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Group } from '@xiaoye-react/ui';
import { DatePicker } from '@xiaoye-react/dates';

function Demo() {
  return (
    <Group justify="center">
      <DatePicker maxLevel="year" />
      <DatePicker maxLevel="month" />
    </Group>
  );
}
`;

function Demo() {
  return (
    <Group justify="center">
      <DatePicker maxLevel="year" />
      <DatePicker maxLevel="month" />
    </Group>
  );
}

export const maxLevel: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
