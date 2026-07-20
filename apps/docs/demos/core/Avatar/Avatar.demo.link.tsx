import { Avatar } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { avatars } from './_mockdata';

const code = `
import { Avatar } from '@react-ui/ui';

function Demo() {
  return (
    <Avatar
      component="a"
      href="https://github.com/rtivital"
      target="_blank"
      src="avatar.png"
      alt="it's me"
    />
  );
}
`;

function Demo() {
  return (
    <Avatar
      component="a"
      href="https://github.com/rtivital"
      target="_blank"
      src={avatars[0]}
      alt="it's me"
    />
  );
}

export const link: UIDemo = {
  type: 'code',
  centered: true,
  code,
  component: Demo,
};
