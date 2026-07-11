import { Avatar, Indicator } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Avatar, Indicator } from '@react-ui/ui';

function Demo() {
  return (
    <Indicator inline label="New" size={16}>
      <Avatar
        size="lg"
        radius="sm"
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
      />
    </Indicator>
  );
}
`;

function Demo() {
  return (
    <Indicator inline label="New" size={16}>
      <Avatar
        size="lg"
        radius="sm"
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
      />
    </Indicator>
  );
}

export const inline: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
