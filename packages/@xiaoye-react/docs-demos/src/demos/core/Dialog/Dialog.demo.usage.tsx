import { Button, Dialog, Group, Text, TextInput } from '@xiaoye-react/ui';
import { useDisclosure } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useDisclosure } from '@xiaoye-react/hooks';
import { Dialog, Group, Button, TextInput, Text } from '@xiaoye-react/ui';

function Demo() {
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <>
      <Group justify="center">
        <Button onClick={toggle}>切换对话框</Button>
      </Group>

      <Dialog
        opened={opened}
        withCloseButton
        onClose={close}
        size="lg"
        position={{ bottom: 20, left: 20 }}
      >
        <Text size="sm" mb="xs" fw={500}>
          Subscribe to email newsletter
        </Text>

        <Group align="flex-end">
          <TextInput placeholder="yourname@example.com" style={{ flex: 1 }} />
          <Button onClick={close}>订阅</Button>
        </Group>
      </Dialog>
    </>
  );
}
`;

function Demo() {
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <>
      <Group justify="center">
        <Button onClick={toggle}>切换对话框</Button>
      </Group>

      <Dialog
        opened={opened}
        withCloseButton
        onClose={close}
        size="lg"
        position={{ bottom: 20, left: 20 }}
      >
        <Text size="sm" mb="xs" fw={500}>
          Subscribe to email newsletter
        </Text>

        <Group align="flex-end">
          <TextInput placeholder="yourname@example.com" style={{ flex: 1 }} />
          <Button onClick={close}>订阅</Button>
        </Group>
      </Dialog>
    </>
  );
}

export const usage: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
