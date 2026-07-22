import { Button, em, Modal } from '@xiaoye-react/ui';
import { useDisclosure, useMediaQuery } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useDisclosure, useMediaQuery } from '@xiaoye-react/hooks';
import { Modal, Button } from '@xiaoye-react/ui';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: ${em(800)})');

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="这是全屏模态框"
        fullScreen={isMobile}
        transitionProps={{ transition: 'fade', duration: 200 }}
      >
        The Modal will be full screen only on mobile
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
  const isMobile = useMediaQuery(`(max-width: ${em(800)})`);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="这是全屏模态框"
        fullScreen={isMobile}
        transitionProps={{ transition: 'fade', duration: 200 }}
      >
        The Modal will be full screen only on mobile
      </Modal>

      <Button variant="default" onClick={open}>
        打开模态框
      </Button>
    </>
  );
}

export const fullScreenMobile: UIDemo = {
  type: 'code',
  code,
  centered: true,
  component: Demo,
};
