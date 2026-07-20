import { Button, Modal } from '@react-ui/ui';
import { useDisclosure } from '@react-ui/hooks';
import { UIDemo } from '@react-ui/demo';

const code = `
import { useDisclosure } from '@react-ui/hooks';
import { Modal, Button } from '@react-ui/ui';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  const content = Array(100)
    .fill(0)
    .map((_, index) => <p key={index}>带滚动的模态框</p>);

  return (
    <>
      <Modal opened={opened} onClose={close} title="头部固定">
        {content}
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

  const content = Array(100)
    .fill(0)
    .map((_, index) => <p key={index}>带滚动的模态框</p>);

  return (
    <>
      <Modal opened={opened} onClose={close} title="头部固定">
        {content}
      </Modal>

      <Button variant="default" onClick={open}>
        打开模态框
      </Button>
    </>
  );
}

export const overflow: UIDemo = {
  type: 'code',
  code,
  centered: true,
  component: Demo,
};
