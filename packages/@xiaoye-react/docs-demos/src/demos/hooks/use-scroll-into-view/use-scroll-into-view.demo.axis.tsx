import { Box, Button, Group, Paper, Text } from '@xiaoye-react/ui';
import { useScrollIntoView } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useScrollIntoView } from '@xiaoye-react/hooks';
import { Button, Text, Group, Paper, Box } from '@xiaoye-react/ui';

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
            <Text>把我滚动到视图</Text>
          </Paper>
        </Box>
      </Paper>
      <Button onClick={() => scrollIntoView()}>滚动到目标</Button>
    </Group>
  );
}

export const axis: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
