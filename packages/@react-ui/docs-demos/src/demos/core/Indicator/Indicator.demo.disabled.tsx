import { Avatar, Button, Indicator, Stack } from '@react-ui/ui';
import { useDisclosure } from '@react-ui/hooks';
import { UIDemo } from '@react-ui/demo';

const code = `
import { useDisclosure } from '@react-ui/hooks';
import { Avatar, Indicator, Button, Stack } from '@react-ui/ui';

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
