import { Calendar } from '@react-ui/dates';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Calendar } from '@react-ui/dates';

function Demo() {
  return <Calendar fullWidth />;
}
`;

function Demo() {
  return <Calendar fullWidth />;
}

export const fullWidth: UIDemo = {
  type: 'code',
  centered: true,
  maxWidth: 600,
  component: Demo,
  code,
};
