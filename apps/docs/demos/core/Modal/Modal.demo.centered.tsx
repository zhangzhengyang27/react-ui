import { Button, Modal } from '@react-ui/ui';
import { useDisclosure } from '@react-ui/hooks';
import { UIDemo } from '@react-ui/demo';
import { AuthenticationForm } from '../../shared/AuthenticationForm/AuthenticationForm';

const code = `
import { useDisclosure } from '@react-ui/hooks';
import { Modal, Button } from '@react-ui/ui';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="认证" centered>
        {/* Modal content */}
      </Modal>

      <Button variant="default" onClick={open}>
        打开居中的模态框
      </Button>
    </>
  );
}
`;

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="认证" centered>
        <AuthenticationForm noPadding noShadow />
      </Modal>

      <Button variant="default" onClick={open}>
        打开居中的模态框
      </Button>
    </>
  );
}

export const centered: UIDemo = {
  type: 'code',
  code,
  centered: true,
  component: Demo,
};
