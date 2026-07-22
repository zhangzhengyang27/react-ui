import { Avatar, Group } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { names, namesCode } from './_mockdata';

const code = `
import { Avatar, Group } from '@xiaoye-react/ui';

${namesCode}

function Demo() {
  const avatars = names.map((name) => (
    <Avatar key={name} name={name} color="initials" allowedInitialsColors={['blue', 'red']} />
  ));
  return <Group>{avatars}</Group>;
}
`;

function Demo() {
  const avatars = names.map((name) => (
    <Avatar key={name} name={name} color="initials" allowedInitialsColors={['blue', 'red']} />
  ));
  return <Group>{avatars}</Group>;
}

export const allowedColors: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
