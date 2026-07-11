import { Avatar, Group } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';
import { names, namesCode } from './_mockdata';

const code = `
import { Avatar, Group } from '@react-ui/ui';

${namesCode}

function Demo() {
  const avatars = names.map((name) => <Avatar key={name} name={name} color="initials" />);
  return <Group>{avatars}</Group>;
}
`;

function Demo() {
  const avatars = names.map((name) => <Avatar key={name} name={name} color="initials" />);
  return <Group>{avatars}</Group>;
}

export const initials: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
