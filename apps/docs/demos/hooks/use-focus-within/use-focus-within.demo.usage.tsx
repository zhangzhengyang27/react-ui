import { Box, Button, Text, TextInput } from '@react-ui/ui';
import { useFocusWithin } from '@react-ui/hooks';
import { UIDemo } from '@react-ui/demo';

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
        <TextInput label="聚焦此输入" placeholder="样式将添加到父元素" />
        <Button mt="md">按钮</Button>
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
        <TextInput label="聚焦此输入" placeholder="样式将添加到父元素" />
        <Button mt="md">按钮</Button>
      </Box>
    </div>
  );
}

export const usage: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
