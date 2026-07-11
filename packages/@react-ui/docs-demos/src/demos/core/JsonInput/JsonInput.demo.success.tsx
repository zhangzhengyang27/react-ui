import { JsonInput } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { JsonInput } from '@react-ui/ui';

function Demo() {
  return <JsonInput label="JSON config" placeholder="JSON config" success="Valid JSON" />;
}
`;

function Demo() {
  return <JsonInput label="JSON config" placeholder="JSON config" success="Valid JSON" />;
}

export const success: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
