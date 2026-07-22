import { Box, Button, Group, Portal, Text } from '@xiaoye-react/ui';
import { useDisclosure, useHeadroom } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Box, Button, Group, Portal, Text } from '@xiaoye-react/ui';
import { useDisclosure, useHeadroom } from '@xiaoye-react/hooks';

function Demo() {
  const [showHeader, handlers] = useDisclosure(false);
  const { scrollProgress } = useHeadroom({ fixedAt: 120, scrollDistance: 60 });

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
              height: 60,
              zIndex: 1000000,
              transform: \`translateY(\${(scrollProgress - 1) * 100}%)\`,
              backgroundColor: 'var(--ui-color-violet-6)',
            }}
          >
            <Group justify="center" h="100%">
              <Text c="white" fw={500}>
                Scroll-linked — {Math.round(scrollProgress * 100)}% visible
              </Text>
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
  const { scrollProgress } = useHeadroom({ fixedAt: 120, scrollDistance: 60 });

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
              height: 60,
              zIndex: 1000000,
              transform: `translateY(${(scrollProgress - 1) * 100}%)`,
              backgroundColor: 'var(--ui-color-violet-6)',
            }}
          >
            <Group justify="center" h="100%">
              <Text c="white" fw={500}>
                Scroll-linked — {Math.round(scrollProgress * 100)}% visible
              </Text>
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

export const scrollProgress: UIDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
};
