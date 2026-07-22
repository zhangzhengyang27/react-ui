import { Avatar, Indicator } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Avatar, Indicator } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Indicator inline label="新" size={16}>
      <Avatar
        size="lg"
        radius="sm"
        src="https://raw.githubusercontent.com/uidev/ui/master/.demo/avatars/avatar-2.png"
      />
    </Indicator>
  );
}
`;

function Demo() {
  return (
    <Indicator inline label="新" size={16}>
      <Avatar
        size="lg"
        radius="sm"
        src="https://raw.githubusercontent.com/uidev/ui/master/.demo/avatars/avatar-2.png"
      />
    </Indicator>
  );
}

export const inline: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
