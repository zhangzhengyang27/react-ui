import { Box, Tooltip } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Box, Tooltip } from '@react-ui/ui';

function Demo() {
  return (
    <Tooltip.Floating label="Floating tooltip">
      <Box p="xl" bg="var(--ui-color-blue-light)" style={{ cursor: 'default' }}>
        Hover over the box to see tooltip
      </Box>
    </Tooltip.Floating>
  );
}
`;

function Demo() {
  return (
    <Tooltip.Floating label="Floating tooltip">
      <Box p="xl" bg="var(--ui-color-blue-light)" style={{ cursor: 'default' }}>
        Hover over the box to see tooltip
      </Box>
    </Tooltip.Floating>
  );
}

export const floating: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
