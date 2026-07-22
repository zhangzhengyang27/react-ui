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
      <Modal.Root opened={opened} onClose={close}>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>模态框标题</Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body>模态框内容</Modal.Body>
        </Modal.Content>
      </Modal.Root>

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
      <Modal.Root opened={opened} onClose={close}>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>模态框标题</Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body>模态框内容</Modal.Body>
        </Modal.Content>
      </Modal.Root>

      <Button variant="default" onClick={open}>
        打开模态框
      </Button>
    </>
  );
}

export const composition: UIDemo = {
  type: 'code',
  code,
  centered: true,
  component: Demo,
};
