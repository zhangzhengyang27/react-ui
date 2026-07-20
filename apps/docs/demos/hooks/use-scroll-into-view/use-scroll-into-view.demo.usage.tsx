import { Box, Button, Group, Text } from '@react-ui/ui';
import { useScrollIntoView } from '@react-ui/hooks';
import { UIDemo } from '@react-ui/demo';

const code = `
import { useScrollIntoView } from '@react-ui/hooks';
import { Button, Text, Group, Box } from '@react-ui/ui';

function Demo() {
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: 60,
  });

  return (
    <Group justify="center">
      <Button
        onClick={() =>
          scrollIntoView({
            alignment: 'center',
          })
        }
      >
        Scroll to target
      </Button>
      <Box
        style={{
          width: '100%',
          height: '50vh',
          backgroundColor: 'var(--ui-color-blue-light)',
        }}
      />
      <Text ref={targetRef}>你好</Text>
    </Group>
  );
}
`;

function Demo() {
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: 60,
  });

  return (
    <Group justify="center">
      <Button
        onClick={() =>
          scrollIntoView({
            alignment: 'center',
          })
        }
      >
        Scroll to target
      </Button>
      <Box
        style={{
          width: '100%',
          height: '50vh',
          backgroundColor: 'var(--ui-color-blue-light)',
        }}
      />
      <Text ref={targetRef}>你好</Text>
    </Group>
  );
}

export const usage: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
