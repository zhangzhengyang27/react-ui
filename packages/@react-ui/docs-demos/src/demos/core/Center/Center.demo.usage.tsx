import { Box, Center } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Center, Box } from '@react-ui/ui';

function Demo() {
  return (
    <Center maw={400} h={100} bg="var(--ui-color-gray-light)">
      <Box bg="var(--ui-color-blue-light)">All elements inside Center are centered</Box>
    </Center>
  );
}
`;

function Demo() {
  return (
    <Center maw={400} h={100} bg="var(--ui-color-gray-light)">
      <Box bg="var(--ui-color-blue-light)">All elements inside Center are centered</Box>
    </Center>
  );
}

export const usage: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
};
