import { TimePicker } from '@react-ui/dates';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { TimePicker } from '@react-ui/dates';

function Demo() {
  return <TimePicker label="Enter time" format="12h" />;
}
`;

function Demo() {
  return <TimePicker label="Enter time" format="12h" />;
}

export const format12h: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
