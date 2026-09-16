import { Avatar, Indicator } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Avatar, Indicator } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Indicator inline size={16} offset={7} position="bottom-end" color="red" withBorder>
      <Avatar
        size="lg"
        radius="xl"
        src="/demo/avatars/avatar-3.png"
      />
    </Indicator>
  );
}
`;

function Demo() {
  return (
    <Indicator inline size={16} offset={7} position="bottom-end" color="red" withBorder>
      <Avatar
        size="lg"
        radius="xl"
        src="/demo/avatars/avatar-3.png"
      />
    </Indicator>
  );
}

export const offset: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
