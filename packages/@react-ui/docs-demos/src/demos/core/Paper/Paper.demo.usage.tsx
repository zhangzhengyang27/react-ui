import { Box, Paper, Text } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

function Wrapper(props: any) {
  return (
    <Box p="md">
      <Paper maw={400} mx="auto" p="xl" {...props}>
        <Text>Paper 是最基础的 UI 组件</Text>
        <Text>
          Use it to create cards, dropdowns, modals and other components that require background
          with shadow
        </Text>
      </Paper>
    </Box>
  );
}

const code = `
import { Text, Paper } from '@react-ui/ui';

function Demo() {
  return (
    <Paper{{props}} p="xl">
      <Text>Paper 是最基础的 UI 组件</Text>
      <Text>
        Use it to create cards, dropdowns, modals and other components that require background
        with shadow
      </Text>
    </Paper>
  );
}
`;

export const usage: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  dimmed: true,
  controls: [
    { prop: 'shadow', type: 'size', initialValue: 'xs', libraryValue: 'none' },
    { prop: 'radius', type: 'size', initialValue: 'md', libraryValue: 'md' },
    { prop: 'withBorder', type: 'boolean', initialValue: false, libraryValue: false },
  ],
};
