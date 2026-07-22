import { Avatar, Group, Indicator } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Avatar, Group, Indicator } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Group>
      <Indicator inline label={0}>
        <Avatar
          size="lg"
          radius="xl"
          src="https://raw.githubusercontent.com/uidev/ui/master/.demo/avatars/avatar-1.png"
        />
      </Indicator>

      <Indicator inline label={0} showZero={false}>
        <Avatar
          size="lg"
          radius="xl"
          src="https://raw.githubusercontent.com/uidev/ui/master/.demo/avatars/avatar-2.png"
        />
      </Indicator>
    </Group>
  );
}
`;

function Demo() {
  return (
    <Group>
      <Indicator inline label={0}>
        <Avatar
          size="lg"
          radius="xl"
          src="https://raw.githubusercontent.com/uidev/ui/master/.demo/avatars/avatar-1.png"
        />
      </Indicator>

      <Indicator inline label={0} showZero={false}>
        <Avatar
          size="lg"
          radius="xl"
          src="https://raw.githubusercontent.com/uidev/ui/master/.demo/avatars/avatar-2.png"
        />
      </Indicator>
    </Group>
  );
}

export const showZero: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
