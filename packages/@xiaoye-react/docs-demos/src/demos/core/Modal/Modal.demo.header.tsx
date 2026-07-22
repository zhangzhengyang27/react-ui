import { Button, Modal } from '@xiaoye-react/ui';
import { useDisclosure } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useDisclosure } from '@xiaoye-react/hooks';
import { Modal, Button } from '@xiaoye-react/ui';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} withCloseButton={false}>
        没有头部的模态框，按 Esc 或点击遮罩层关闭
      </Modal>

      <Button variant="default" onClick={open}>
        打开模态框
      </Button>
    </>
  );
}

`;

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} withCloseButton={false}>
        没有头部的模态框，按 Esc 或点击遮罩层关闭
      </Modal>

      <Button variant="default" onClick={open}>
        打开模态框
      </Button>
    </>
  );
}

export const header: UIDemo = {
  type: 'code',
  code,
  centered: true,
  component: Demo,
};
