import { Button, Drawer } from '@xiaoye-react/ui';
import { useDisclosure } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';
import { AuthenticationForm } from '../../shared/AuthenticationForm/AuthenticationForm';

const code = `
import { useDisclosure } from '@xiaoye-react/hooks';
import { Drawer, Button } from '@xiaoye-react/ui';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title="认证"
        transitionProps={{ transition: 'rotate-left', duration: 150, timingFunction: 'linear' }}
      >
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
      <Drawer
        opened={opened}
        onClose={close}
        title="认证"
        transitionProps={{ transition: 'rotate-left', duration: 150, timingFunction: 'linear' }}
      >
        <AuthenticationForm noShadow noPadding />
      </Drawer>

      <Button variant="default" onClick={open}>
        打开抽屉
      </Button>
    </>
  );
}

export const transitions: UIDemo = {
  type: 'code',
  code,
  centered: true,
  component: Demo,
};
