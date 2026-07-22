import { useState } from 'react';
import { Button, Drawer, Group } from '@xiaoye-react/ui';
import { useDisclosure } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { Button, Group, Drawer } from '@xiaoye-react/ui';
import { useDisclosure } from '@xiaoye-react/hooks';

function Demo() {
  const [firstOpened, firstHandlers] = useDisclosure(false);
  const [secondOpened, secondHandlers] = useDisclosure(false);
  const [drawerData, setDrawerData] = useState({
    title: '',
    message: '',
  });

  return (
    <>
      <Drawer
        opened={firstOpened}
        onClose={() => {
          firstHandlers.close();
          setDrawerData({ title: '', message: '' });
        }}
        title={drawerData.title}
      >
        {drawerData.message}
      </Drawer>
      <Drawer
        opened={secondOpened}
        onClose={secondHandlers.close}
        onExitTransitionEnd={() => setDrawerData({ title: '', message: '' })}
        title={drawerData.title}
      >
        {drawerData.message}
      </Drawer>

      <Group>
        <Button
          onClick={() => {
            firstHandlers.open();
            setDrawerData({ title: '编辑你的资料', message: '这里想象一个表单' });
          }}
        >
          在 onClose 中清除数据
        </Button>

        <Button
          onClick={() => {
            secondHandlers.open();
            setDrawerData({ title: '编辑你的资料', message: '这里想象一个表单' });
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
  const [drawerData, setDrawerData] = useState({
    title: '',
    message: '',
  });

  return (
    <>
      <Drawer
        opened={firstOpened}
        onClose={() => {
          firstHandlers.close();
          setDrawerData({ title: '', message: '' });
        }}
        transitionProps={{ duration: 300, exitDuration: 1000 }}
        title={drawerData.title}
      >
        {drawerData.message}
      </Drawer>
      <Drawer
        opened={secondOpened}
        onClose={secondHandlers.close}
        transitionProps={{ duration: 300, exitDuration: 1000 }}
        onExitTransitionEnd={() => setDrawerData({ title: '', message: '' })}
        title={drawerData.title}
      >
        {drawerData.message}
      </Drawer>

      <Group>
        <Button
          onClick={() => {
            firstHandlers.open();
            setDrawerData({ title: '编辑你的资料', message: '这里想象一个表单' });
          }}
          variant="default"
        >
          在 onClose 中清除数据
        </Button>

        <Button
          onClick={() => {
            secondHandlers.open();
            setDrawerData({ title: '编辑你的资料', message: '这里想象一个表单' });
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
