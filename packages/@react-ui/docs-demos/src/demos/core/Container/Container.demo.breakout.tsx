import { Box, Container } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Box, Container } from '@react-ui/ui';

function Demo() {
  return (
    <Container strategy="grid" size={500}>
      <Box bg="var(--ui-color-indigo-light)" h={50}>
        Main content
      </Box>

      <Box data-breakout bg="var(--ui-color-indigo-light)" mt="xs">
        <div>突破容器</div>

        <Box data-container bg="indigo" c="white" h={50}>
          <div>突破容器内的 Container</div>
        </Box>
      </Box>
    </Container>
  );
}
`;

function Demo() {
  return (
    <Container strategy="grid" size={500}>
      <Box bg="var(--ui-color-indigo-light)" h={50}>
        Main content
      </Box>

      <Box data-breakout bg="var(--ui-color-indigo-light)" mt="xs">
        <div>突破容器</div>

        <Box data-container bg="indigo" c="white" h={50}>
          <div>突破容器内的 Container</div>
        </Box>
      </Box>
    </Container>
  );
}

export const breakout: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
