import { Box, Tooltip } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Box, Tooltip } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Tooltip.Floating label="浮动提示">
      <Box p="xl" bg="var(--ui-color-blue-light)" style={{ cursor: 'default' }}>
        Hover over the box to see tooltip
      </Box>
    </Tooltip.Floating>
  );
}
`;

function Demo() {
  return (
    <Tooltip.Floating label="浮动提示">
      <Box p="xl" bg="var(--ui-color-blue-light)" style={{ cursor: 'default' }}>
        Hover over the box to see tooltip
      </Box>
    </Tooltip.Floating>
  );
}

export const floating: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
