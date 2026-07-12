import { Box, Button, Group, Paper, Text } from '@react-ui/ui';
import { useScrollIntoView } from '@react-ui/hooks';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { useScrollIntoView } from '@react-ui/hooks';
import { Button, Text, Group, Paper, Box } from '@react-ui/ui';

function Demo() {
  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView<
    HTMLDivElement,
    HTMLDivElement
  >({ axis: 'x' });

  return (
    <Group justify="center">
      <Paper ref={scrollableRef} h={150} w={300} style={{ overflowX: 'scroll' }}>
        <Box pl={260} pr={450}>
          <Paper
            ref={targetRef}
            p="md"
            style={{
              backgroundColor: 'var(--ui-color-blue-light)',
              width: 'max-content',
            }}
          >
            <Text>Scroll me into view</Text>
          </Paper>
        </Box>
      </Paper>
      <Button onClick={() => scrollIntoView()}>Scroll to target</Button>
    </Group>
  );
}
`;

function Demo() {
  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView<
    HTMLDivElement,
    HTMLDivElement
  >({ axis: 'x' });

  return (
    <Group justify="center">
      <Paper ref={scrollableRef} h={150} w={300} style={{ overflowX: 'scroll' }}>
        <Box pl={260} pr={450}>
          <Paper
            ref={targetRef}
            p="md"
            style={{
              backgroundColor: 'var(--ui-color-blue-light)',
              width: 'max-content',
            }}
          >
            <Text>Scroll me into view</Text>
          </Paper>
        </Box>
      </Paper>
      <Button onClick={() => scrollIntoView()}>Scroll to target</Button>
    </Group>
  );
}

export const axis: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
};
