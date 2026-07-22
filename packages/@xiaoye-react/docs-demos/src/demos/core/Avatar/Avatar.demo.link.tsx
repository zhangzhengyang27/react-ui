import { Avatar } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { avatars } from './_mockdata';

const code = `
import { Avatar } from '@xiaoye-react/ui';

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
