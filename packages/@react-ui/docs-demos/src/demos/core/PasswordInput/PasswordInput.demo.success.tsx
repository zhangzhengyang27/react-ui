import { PasswordInput } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { PasswordInput } from '@react-ui/ui';

function Demo() {
  return <PasswordInput label="Password Input" placeholder="Password Input" success="Looks good!" />;
}
`;

function Demo() {
  return (
    <PasswordInput label="Password Input" placeholder="Password Input" success="Looks good!" />
  );
}

export const success: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
