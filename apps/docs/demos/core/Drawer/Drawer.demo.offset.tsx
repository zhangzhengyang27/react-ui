import { Button, Drawer } from '@react-ui/ui';
import { useDisclosure } from '@react-ui/hooks';
import { UIDemo } from '@react-ui/demo';
import { AuthenticationForm } from '../../shared/AuthenticationForm/AuthenticationForm';

const code = `
import { useDisclosure } from '@react-ui/hooks';
import { Drawer, Button } from '@react-ui/ui';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer offset={8} radius="md" opened={opened} onClose={close} title="认证">
        {/* Drawer content */}
      </Drawer>

      <Button variant="default" onClick={open}>
        打开抽屉
      </Button>
    </>
  );
}
`;

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer offset={8} radius="md" opened={opened} onClose={close} title="认证">
        <AuthenticationForm noShadow noPadding />
      </Drawer>

      <Button variant="default" onClick={open}>
        打开抽屉
      </Button>
    </>
  );
}

export const offset: UIDemo = {
  type: 'code',
  code,
  centered: true,
  component: Demo,
};
