import { Box, Button, Group, Paper, Text } from '@react-ui/ui';
import { useScrollIntoView } from '@react-ui/hooks';
import { UIDemo } from '@react-ui/demo';

const code = `
import { useScrollIntoView } from '@react-ui/hooks';
import { Button, Text, Group, Paper, Box } from '@react-ui/ui';

function Demo() {
  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView<
    HTMLDivElement,
    HTMLDivElement
  >();

  return (
    <Group justify="center">
      <Paper ref={scrollableRef} h={300} style={{ overflowY: 'scroll', flex: 1 }}>
        <Box pt={260} pb={450}>
          <Paper
            ref={targetRef}
            p="xl"
            style={{
              backgroundColor: 'var(--ui-color-blue-light)',
              width: '100%',
            }}
          >
            <Text>把我滚动到视图</Text>
          </Paper>
        </Box>
      </Paper>
      <Button onClick={() => scrollIntoView()}>滚动到目标</Button>
    </Group>
  );
}
`;

function Demo() {
  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView<
    HTMLDivElement,
    HTMLDivElement
  >();

  return (
    <Group justify="center">
      <Paper ref={scrollableRef} h={300} style={{ overflowY: 'scroll', flex: 1 }}>
        <Box pt={260} pb={450}>
          <Paper
            ref={targetRef}
            p="xl"
            style={{
              backgroundColor: 'var(--ui-color-blue-light)',
              width: '100%',
            }}
          >
            <Text>把我滚动到视图</Text>
          </Paper>
        </Box>
      </Paper>
      <Button onClick={() => scrollIntoView()}>滚动到目标</Button>
    </Group>
  );
}

export const parent: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
