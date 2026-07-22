import { Divider, Group, Text } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Divider, Group, Text } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Group>
      <Text>标签</Text>
      <Divider orientation="vertical" />
      <Text>标签</Text>
      <Divider size="sm" orientation="vertical" />
      <Text>标签</Text>
      <Divider size="md" orientation="vertical" />
      <Text>标签</Text>
      <Divider size="lg" orientation="vertical" />
      <Text>标签</Text>
      <Divider size="xl" orientation="vertical" />
      <Text>标签</Text>
    </Group>
  );
}
`;

function Demo() {
  return (
    <Group>
      <Text>标签</Text>
      <Divider orientation="vertical" />
      <Text>标签</Text>
      <Divider size="sm" orientation="vertical" />
      <Text>标签</Text>
      <Divider size="md" orientation="vertical" />
      <Text>标签</Text>
      <Divider size="lg" orientation="vertical" />
      <Text>标签</Text>
      <Divider size="xl" orientation="vertical" />
      <Text>标签</Text>
    </Group>
  );
}

export const orientation: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
