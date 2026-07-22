import { useState } from 'react';
import { Button, Chip, CloseButton, FloatingWindow, Group, Text } from '@xiaoye-react/ui';
import { useDisclosure } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Button, Chip, CloseButton, FloatingWindow, Group, Text } from '@xiaoye-react/ui';
import { useDisclosure } from '@xiaoye-react/hooks';

function Demo() {
  const [visible, handlers] = useDisclosure();
  const [enabled, setEnabled] = useState(true);

  return (
    <>
      <Group>
        <Button variant="default" onClick={handlers.toggle}>
          {visible ? '隐藏' : '显示'} 浮动窗口
        </Button>
        <Chip checked={enabled} onChange={() => setEnabled((e) => !e)}>
          Drag {enabled ? 'enabled' : 'disabled'}
        </Chip>
      </Group>

      {visible && (
        <FloatingWindow
          w={280}
          p="md"
          withBorder
          excludeDragHandleSelector="button"
          initialPosition={{ top: 300, left: 20 }}
          style={{ cursor: 'move' }}
          enabled={enabled}
        >
          <Group justify="space-between" mb="md">
            <Text>启用演示</Text>
            <CloseButton onClick={handlers.close} />
          </Group>
          <Text fz="sm">这是一个浮动窗口。你可以拖动它。</Text>
        </FloatingWindow>
      )}
    </>
  );
}
`;

function Demo() {
  const [visible, handlers] = useDisclosure();
  const [enabled, setEnabled] = useState(true);

  return (
    <>
      <Group>
        <Button variant="default" onClick={handlers.toggle}>
          {visible ? '隐藏' : '显示'} 浮动窗口
        </Button>
        <Chip checked={enabled} onChange={() => setEnabled((e) => !e)}>
          Drag {enabled ? 'enabled' : 'disabled'}
        </Chip>
      </Group>

      {visible && (
        <FloatingWindow
          w={280}
          p="md"
          withBorder
          excludeDragHandleSelector="button"
          initialPosition={{ top: 300, left: 20 }}
          style={{ cursor: 'move' }}
          enabled={enabled}
        >
          <Group justify="space-between" mb="md">
            <Text>启用演示</Text>
            <CloseButton onClick={handlers.close} />
          </Group>
          <Text fz="sm">这是一个浮动窗口。你可以拖动它。</Text>
        </FloatingWindow>
      )}
    </>
  );
}

export const enabled: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
