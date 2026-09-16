import { Avatar, Group, Indicator } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Avatar, Group, Indicator } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Group>
      <Indicator inline label={50} maxValue={99}>
        <Avatar
          size="lg"
          radius="xl"
          src="/demo/avatars/avatar-1.png"
        />
      </Indicator>

      <Indicator inline label={100} maxValue={99}>
        <Avatar
          size="lg"
          radius="xl"
          src="/demo/avatars/avatar-2.png"
        />
      </Indicator>

      <Indicator inline label={1000} maxValue={999}>
        <Avatar
          size="lg"
          radius="xl"
          src="/demo/avatars/avatar-3.png"
        />
      </Indicator>
    </Group>
  );
}
`;

function Demo() {
  return (
    <Group>
      <Indicator inline label={50} maxValue={99}>
        <Avatar
          size="lg"
          radius="xl"
          src="/demo/avatars/avatar-1.png"
        />
      </Indicator>

      <Indicator inline label={100} maxValue={99}>
        <Avatar
          size="lg"
          radius="xl"
          src="/demo/avatars/avatar-2.png"
        />
      </Indicator>

      <Indicator inline label={1000} maxValue={999}>
        <Avatar
          size="lg"
          radius="xl"
          src="/demo/avatars/avatar-3.png"
        />
      </Indicator>
    </Group>
  );
}

export const maxValue: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
