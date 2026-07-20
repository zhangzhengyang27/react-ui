import { Box, Button, Group, Text } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Group, Button, Box, Text } from '@react-ui/ui';

function Demo() {
  return (
    <Box style={{ overflow: 'hidden' }}>
      <Box maw={500} p="md" mx="auto" bg="var(--ui-color-blue-light)">
        <Text size="sm" mb={5}>
          preventGrowOverflow: true – each child width is always limited to 33% of parent width
          (since there are 3 children)
        </Text>

        <Group grow wrap="nowrap">
          <Button variant="default">第一个按钮</Button>
          <Button variant="default">第二个带大量内容的按钮</Button>
          <Button variant="default">第三个按钮</Button>
        </Group>

        <Text size="sm" mb={5} mt="md">
          preventGrowOverflow: false – children will grow based on their content, they can take more
          than 33% of parent width
        </Text>

        <Group grow preventGrowOverflow={false} wrap="nowrap">
          <Button variant="default">第一个按钮</Button>
          <Button variant="default">第二个带大量内容的按钮</Button>
          <Button variant="default">第三个按钮</Button>
        </Group>
      </Box>
    </Box>
  );
}
`;

function Demo() {
  return (
    <Box style={{ overflow: 'hidden' }}>
      <Box maw={500} p="md" mx="auto" bg="var(--ui-color-blue-light)">
        <Text size="sm" mb={5}>
          preventGrowOverflow: true – each child width is always limited to 33% of parent width
          (since there are 3 children)
        </Text>

        <Group grow wrap="nowrap">
          <Button variant="default">第一个按钮</Button>
          <Button variant="default">第二个带大量内容的按钮</Button>
          <Button variant="default">第三个按钮</Button>
        </Group>

        <Text size="sm" mb={5} mt="md">
          preventGrowOverflow: false – children will grow based on their content, they can take more
          than 33% of parent width
        </Text>

        <Group grow preventGrowOverflow={false} wrap="nowrap">
          <Button variant="default">第一个按钮</Button>
          <Button variant="default">第二个带大量内容的按钮</Button>
          <Button variant="default">第三个按钮</Button>
        </Group>
      </Box>
    </Box>
  );
}

export const preventGrowOverflow: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
