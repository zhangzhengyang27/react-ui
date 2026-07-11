import { DateInput } from '@react-ui/dates';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { DateInput } from '@react-ui/dates';

function Demo() {
  return <DateInput label="Disabled" placeholder="Date input" disabled />;
}
`;

function Demo() {
  return <DateInput label="Disabled" placeholder="Date input" disabled />;
}

export const disabled: MantineDemo = {
  type: 'code',
  centered: true,
  maxWidth: 400,
  component: Demo,
  code,
};
