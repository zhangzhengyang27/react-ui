import { TimeInput } from '@react-ui/dates';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { TimeInput } from '@react-ui/dates';

function Demo() {
  return <TimeInput disabled />;
}
`;

function Demo() {
  return <TimeInput disabled />;
}

export const disabled: MantineDemo = {
  type: 'code',
  centered: true,
  maxWidth: 340,
  component: Demo,
  code,
};
