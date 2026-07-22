import { Avatar, Button, Indicator, Stack } from '@xiaoye-react/ui';
import { useDisclosure } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useDisclosure } from '@xiaoye-react/hooks';
import { Avatar, Indicator, Button, Stack } from '@xiaoye-react/ui';

function Demo() {
  const [visible, { toggle }] = useDisclosure();

  return (
    <Stack align="center">
      <Indicator inline disabled={!visible} color="red" size={12}>
        <Avatar
          size="lg"
          radius="sm"
          src="https://raw.githubusercontent.com/uidev/ui/master/.demo/avatars/avatar-5.png"
        />
      </Indicator>
      <Button onClick={toggle}>切换指示器</Button>
    </Stack>
  );
}
`;

function Demo() {
  const [visible, { toggle }] = useDisclosure();

  return (
    <Stack align="center">
      <Indicator inline disabled={!visible} color="red" size={12}>
        <Avatar
          size="lg"
          radius="sm"
          src="https://raw.githubusercontent.com/uidev/ui/master/.demo/avatars/avatar-5.png"
        />
      </Indicator>
      <Button onClick={toggle}>切换指示器</Button>
    </Stack>
  );
}

export const disabled: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
