import { TimePicker } from '@react-ui/dates';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { TimePicker } from '@react-ui/dates';

function Demo() {
  return <TimePicker label="Enter time" defaultValue="12:45:33" readOnly />;
}
`;

function Demo() {
  return <TimePicker label="Enter time" defaultValue="12:45:33" readOnly />;
}

export const readOnly: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
