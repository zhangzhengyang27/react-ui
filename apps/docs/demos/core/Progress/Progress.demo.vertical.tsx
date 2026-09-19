import { Group, Progress } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Progress } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Group>
      <Progress value={80} orientation="vertical" h={200} />
      <Progress value={60} color="orange" size="xl" orientation="vertical" h={200} animated />

      <Progress.Root size="xl" orientation="vertical" h={200}>
        <Progress.Section value={40} color="lime.4">
          <Progress.Label>文档</Progress.Label>
        </Progress.Section>
        <Progress.Section value={20} color="yellow.4">
          <Progress.Label>应用</Progress.Label>
        </Progress.Section>
        <Progress.Section value={20} color="cyan.7">
          <Progress.Label>其他</Progress.Label>
        </Progress.Section>
      </Progress.Root>
    </Group>
  );
}
`;

function Demo() {
  return (
    <Group>
      <Progress value={80} orientation="vertical" h={200} />
      <Progress value={60} color="orange" size="xl" orientation="vertical" h={200} animated />

      <Progress.Root size="xl" orientation="vertical" h={200}>
        <Progress.Section value={40} color="lime.4">
          <Progress.Label>文档</Progress.Label>
        </Progress.Section>
        <Progress.Section value={20} color="yellow.4">
          <Progress.Label>应用</Progress.Label>
        </Progress.Section>
        <Progress.Section value={20} color="cyan.7">
          <Progress.Label>其他</Progress.Label>
        </Progress.Section>
      </Progress.Root>
    </Group>
  );
}

export const vertical: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
