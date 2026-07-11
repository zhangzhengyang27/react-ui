import { MonthPicker } from '@react-ui/dates';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { MonthPicker } from '@react-ui/dates';

function Demo() {
  return <MonthPicker maxLevel="year" />;
}
`;

function Demo() {
  return <MonthPicker maxLevel="year" />;
}

export const maxLevel: MantineDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
