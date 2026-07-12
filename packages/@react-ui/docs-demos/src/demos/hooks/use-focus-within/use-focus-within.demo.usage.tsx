import { Box, Button, Text, TextInput } from '@react-ui/ui';
import { useFocusWithin } from '@react-ui/hooks';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { useFocusWithin } from '@react-ui/hooks';
import { TextInput, Button, Box, Text } from '@react-ui/ui';

function Demo() {
  const { ref, focused } = useFocusWithin();

  return (
    <div ref={ref}>
      <Box
        p="xl"
        style={{
          backgroundColor: focused ? 'var(--ui-color-blue-light)' : 'transparent',
        }}
      >
        <Text size="sm">One of elements has focus: {focused.toString()}</Text>
        <TextInput label="Focus this input" placeholder="Styles will be added to parent" />
        <Button mt="md">Button</Button>
      </Box>
    </div>
  );
}
`;

function Demo() {
  const { ref, focused } = useFocusWithin();

  return (
    <div ref={ref}>
      <Box
        p="xl"
        style={{
          backgroundColor: focused ? 'var(--ui-color-blue-light)' : 'transparent',
        }}
      >
        <Text size="sm">One of elements has focus: {focused.toString()}</Text>
        <TextInput label="Focus this input" placeholder="Styles will be added to parent" />
        <Button mt="md">Button</Button>
      </Box>
    </div>
  );
}

export const usage: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
