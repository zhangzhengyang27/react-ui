import { Box, Button, Group, Portal, Text } from '@xiaoye-react/ui';
import { useDisclosure, useHeadroom } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Box, Button, Group, Portal, Text } from '@xiaoye-react/ui';
import { useDisclosure, useHeadroom } from '@xiaoye-react/hooks';

function Demo() {
  const [showHeader, handlers] = useDisclosure(false);
  const { pinned } = useHeadroom({ fixedAt: 120 });

  return (
    <>
      {showHeader && (
        <Portal>
          <Box
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              padding: 'var(--ui-spacing-xs)',
              height: 60,
              zIndex: 1000000,
              transform: \`translate3d(0, \${pinned ? 0 : '-110px'}, 0)\`,
              transition: 'transform 400ms ease',
              backgroundColor: 'var(--ui-color-body)',
            }}
          >
            <Group justify="center" h="100%">
              <Text>Pinned header – {pinned ? 'visible' : 'hidden'}</Text>
            </Group>
          </Box>
        </Portal>
      )}

      <Button onClick={handlers.toggle} variant="default">
        {showHeader ? '隐藏' : '显示'} 头部
      </Button>
    </>
  );
}
`;

function Demo() {
  const [showHeader, handlers] = useDisclosure(false);
  const { pinned } = useHeadroom({ fixedAt: 120 });

  return (
    <>
      {showHeader && (
        <Portal>
          <Box
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              padding: 'var(--ui-spacing-xs)',
              height: 60,
              zIndex: 1000000,
              transform: `translate3d(0, ${pinned ? 0 : '-110px'}, 0)`,
              transition: 'transform 400ms ease',
              backgroundColor: 'var(--ui-color-body)',
            }}
          >
            <Group justify="center" h="100%">
              <Text>Pinned header – {pinned ? 'visible' : 'hidden'}</Text>
            </Group>
          </Box>
        </Portal>
      )}

      <Button onClick={handlers.toggle} variant="default">
        {showHeader ? '隐藏' : '显示'} 头部
      </Button>
    </>
  );
}

export const usage: UIDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
};
