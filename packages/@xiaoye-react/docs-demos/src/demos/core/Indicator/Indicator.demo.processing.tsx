import { Avatar, Indicator } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Avatar, Indicator } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Indicator inline processing color="red" size={12}>
      <Avatar
        size="lg"
        radius="sm"
        src="/demo/avatars/avatar-4.png"
      />
    </Indicator>
  );
}
`;

function Demo() {
  return (
    <Indicator inline processing color="red" size={12}>
      <Avatar
        size="lg"
        radius="sm"
        src="/demo/avatars/avatar-4.png"
      />
    </Indicator>
  );
}

export const processing: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
