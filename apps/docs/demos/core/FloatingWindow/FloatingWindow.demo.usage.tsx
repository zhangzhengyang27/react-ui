import { Button, CloseButton, FloatingWindow, Group, Text } from '@react-ui/ui';
import { useDisclosure } from '@react-ui/hooks';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Button, CloseButton, FloatingWindow, Group, Text } from '@react-ui/ui';
import { useDisclosure } from '@react-ui/hooks';

function Demo() {
  const [visible, handlers] = useDisclosure();

  return (
    <>
      <Button onClick={handlers.toggle} variant="default">
        {visible ? '隐藏' : '显示'} 浮动窗口
      </Button>

      {visible && (
        <FloatingWindow
          w={280}
          p="md"
          withBorder
          excludeDragHandleSelector="button"
          initialPosition={{ top: 300, left: 20 }}
          style={{ cursor: 'move' }}
        >
          <Group justify="space-between" mb="md">
            <Text>用法演示</Text>
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

  return (
    <>
      <Button onClick={handlers.toggle} variant="default">
        {visible ? '隐藏' : '显示'} 浮动窗口
      </Button>

      {visible && (
        <FloatingWindow
          w={280}
          p="md"
          withBorder
          excludeDragHandleSelector="button"
          initialPosition={{ top: 300, left: 20 }}
          style={{ cursor: 'move' }}
        >
          <Group justify="space-between" mb="md">
            <Text>用法演示</Text>
            <CloseButton onClick={handlers.close} />
          </Group>
          <Text fz="sm">这是一个浮动窗口。你可以拖动它。</Text>
        </FloatingWindow>
      )}
    </>
  );
}

export const usage: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
