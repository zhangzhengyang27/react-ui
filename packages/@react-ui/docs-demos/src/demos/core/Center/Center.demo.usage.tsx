import { Box, Center } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Center, Box } from '@react-ui/ui';

function Demo() {
  return (
    <Center maw={400} h={100} bg="var(--ui-color-gray-light)">
      <Box bg="var(--ui-color-blue-light)">Center 内的所有元素都居中</Box>
    </Center>
  );
}
`;

function Demo() {
  return (
    <Center maw={400} h={100} bg="var(--ui-color-gray-light)">
      <Box bg="var(--ui-color-blue-light)">Center 内的所有元素都居中</Box>
    </Center>
  );
}

export const usage: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
