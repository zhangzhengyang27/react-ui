import { PasswordInput } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { PasswordInput } from '@react-ui/ui';

function Demo() {
  return <PasswordInput placeholder="Your password" loading />;
}
`;

function Demo() {
  return <PasswordInput placeholder="Your password" loading />;
}

export const loading: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
