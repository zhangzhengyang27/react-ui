import { Avatar } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { avatars } from './_mockdata';

const code = `
import { Avatar } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Avatar.Group>
      <Avatar src="image.png" />
      <Avatar src="image.png" />
      <Avatar src="image.png" />
      <Avatar>+5</Avatar>
    </Avatar.Group>
  );
}
`;

function Demo() {
  return (
    <Avatar.Group>
      <Avatar src={avatars[0]} />
      <Avatar src={avatars[1]} />
      <Avatar src={avatars[2]} />
      <Avatar>+5</Avatar>
    </Avatar.Group>
  );
}

export const group: UIDemo = {
  type: 'code',
  centered: true,
  code,
  component: Demo,
};
