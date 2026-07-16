import { Button, CloseButton, Group, Paper, Portal, Text } from '@react-ui/ui';
import { useDisclosure, useFloatingWindow } from '@react-ui/hooks';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Button, CloseButton, Group, Paper, Portal, Text } from '@react-ui/ui';
import { useDisclosure, useFloatingWindow } from '@react-ui/hooks';

function Demo() {
  const [visible, handlers] = useDisclosure();
  const floatingWindow = useFloatingWindow({
    constrainToViewport: true,
    constrainOffset: 20,
    excludeDragHandleSelector: 'button',
    initialPosition: { top: 300, left: 20 },
  });

  return (
    <>
      <Group>
        <Button onClick={handlers.toggle} variant="default">
          {visible ? '隐藏' : '显示'} 浮动窗口
        </Button>
        <Button
          onClick={() => floatingWindow.setPosition({ bottom: 40, right: 40 })}
          variant="default"
        >
          Set position to bottom right corner
        </Button>
      </Group>

      {visible && (
        <Portal>
          <Paper
            w={280}
            p="md"
            withBorder
            pos="fixed"
            style={{ cursor: 'move', transition: 'box-shadow 70ms ease', zIndex: 400 }}
            shadow={floatingWindow.isDragging ? 'md' : undefined}
            ref={floatingWindow.ref}
          >
            <Group justify="space-between" mb="md">
              <Text>设置位置演示</Text>
              <CloseButton onClick={handlers.close} />
            </Group>
            <Text fz="sm">这是一个浮动窗口。你可以拖动它。</Text>
          </Paper>
        </Portal>
      )}
    </>
  );
}
`;

function Demo() {
  const [visible, handlers] = useDisclosure();
  const floatingWindow = useFloatingWindow({
    constrainToViewport: true,
    constrainOffset: 20,
    excludeDragHandleSelector: 'button',
    initialPosition: { top: 300, left: 20 },
  });

  return (
    <>
      <Group>
        <Button onClick={handlers.toggle} variant="default">
          {visible ? '隐藏' : '显示'} 浮动窗口
        </Button>
        <Button
          onClick={() => floatingWindow.setPosition({ bottom: 40, right: 40 })}
          variant="default"
        >
          Set position to bottom right corner
        </Button>
      </Group>

      {visible && (
        <Portal>
          <Paper
            w={280}
            p="md"
            withBorder
            pos="fixed"
            style={{ cursor: 'move', transition: 'box-shadow 70ms ease', zIndex: 400 }}
            shadow={floatingWindow.isDragging ? 'md' : undefined}
            ref={floatingWindow.ref}
          >
            <Group justify="space-between" mb="md">
              <Text>设置位置演示</Text>
              <CloseButton onClick={handlers.close} />
            </Group>
            <Text fz="sm">这是一个浮动窗口。你可以拖动它。</Text>
          </Paper>
        </Portal>
      )}
    </>
  );
}

export const setPosition: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
