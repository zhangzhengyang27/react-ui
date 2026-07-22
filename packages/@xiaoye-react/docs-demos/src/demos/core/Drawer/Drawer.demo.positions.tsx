import { useState } from 'react';
import { Button, Drawer, Group } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

function Demo() {
  const [opened, setOpened] = useState(false);
  const [position, setPosition] = useState<'top' | 'left' | 'right' | 'bottom'>('top');
  const open = (p: typeof position) => {
    setPosition(p);
    setOpened(true);
  };

  return (
    <>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        padding="md"
        position={position}
        withCloseButton={false}
      >
        按 Esc 关闭抽屉
      </Drawer>

      <Group justify="center">
        <Button variant="default" onClick={() => open('left')}>
          左
        </Button>
        <Button variant="default" onClick={() => open('right')}>
          右
        </Button>
        <Button variant="default" onClick={() => open('top')}>
          上
        </Button>
        <Button variant="default" onClick={() => open('bottom')}>
          下
        </Button>
      </Group>
    </>
  );
}

export const positions: UIDemo = {
  type: 'code',
  component: Demo,
};
