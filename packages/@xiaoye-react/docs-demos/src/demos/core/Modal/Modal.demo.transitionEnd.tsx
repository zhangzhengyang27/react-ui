import { useState } from 'react';
import { Button, Group, Modal } from '@xiaoye-react/ui';
import { useDisclosure } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { Button, Group, Modal } from '@xiaoye-react/ui';
import { useDisclosure } from '@xiaoye-react/hooks';

function Demo() {
  const [firstOpened, firstHandlers] = useDisclosure(false);
  const [secondOpened, secondHandlers] = useDisclosure(false);
  const [modalData, setModalData] = useState({
    title: '',
    message: '',
  });

  return (
    <>
      <Modal
        opened={firstOpened}
        onClose={() => {
          firstHandlers.close();
          setModalData({ title: '', message: '' });
        }}
        title={modalData.title}
      >
        {modalData.message}
      </Modal>
      <Modal
        opened={secondOpened}
        onClose={secondHandlers.close}
        onExitTransitionEnd={() => setModalData({ title: '', message: '' })}
        title={modalData.title}
      >
        {modalData.message}
      </Modal>

      <Group>
        <Button
          onClick={() => {
            firstHandlers.open();
            setModalData({ title: '编辑你的资料', message: '这里想象一个表单' });
          }}
        >
          在 onClose 中清除数据
        </Button>

        <Button
          onClick={() => {
            secondHandlers.open();
            setModalData({ title: '编辑你的资料', message: '这里想象一个表单' });
          }}
        >
          在 onExitTransitionEnd 中清除数据
        </Button>
      </Group>
    </>
  );
}
`;

function Demo() {
  const [firstOpened, firstHandlers] = useDisclosure(false);
  const [secondOpened, secondHandlers] = useDisclosure(false);
  const [modalData, setModalData] = useState({
    title: '',
    message: '',
  });

  return (
    <>
      <Modal
        opened={firstOpened}
        onClose={() => {
          firstHandlers.close();
          setModalData({ title: '', message: '' });
        }}
        transitionProps={{ duration: 300, exitDuration: 1000, transition: 'fade-down' }}
        title={modalData.title}
      >
        {modalData.message}
      </Modal>
      <Modal
        opened={secondOpened}
        onClose={secondHandlers.close}
        transitionProps={{ duration: 300, exitDuration: 1000, transition: 'fade-down' }}
        onExitTransitionEnd={() => setModalData({ title: '', message: '' })}
        title={modalData.title}
      >
        {modalData.message}
      </Modal>

      <Group>
        <Button
          onClick={() => {
            firstHandlers.open();
            setModalData({ title: '编辑你的资料', message: '这里想象一个表单' });
          }}
          variant="default"
        >
          在 onClose 中清除数据
        </Button>

        <Button
          onClick={() => {
            secondHandlers.open();
            setModalData({ title: '编辑你的资料', message: '这里想象一个表单' });
          }}
          variant="default"
        >
          在 onExitTransitionEnd 中清除数据
        </Button>
      </Group>
    </>
  );
}

export const transitionEnd: UIDemo = {
  type: 'code',
  code,
  centered: true,
  component: Demo,
  defaultExpanded: false,
};
