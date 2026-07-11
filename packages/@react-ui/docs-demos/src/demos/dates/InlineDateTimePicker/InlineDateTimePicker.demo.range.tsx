import { InlineDateTimePicker } from '@react-ui/dates';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { InlineDateTimePicker } from '@react-ui/dates';

function Demo() {
  return <InlineDateTimePicker type="range" />;
}
`;

function Demo() {
  return <InlineDateTimePicker type="range" />;
}

export const range: MantineDemo = {
  type: 'code',
  centered: true,
  maxWidth: 280,
  component: Demo,
  code,
};
