import { Progress } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Progress } from '@react-ui/ui';

function Demo() {
  return (
    <Progress.Root size="xl">
      <Progress.Section value={35} color="cyan">
        <Progress.Label>文档</Progress.Label>
      </Progress.Section>
      <Progress.Section value={28} color="pink">
        <Progress.Label>照片</Progress.Label>
      </Progress.Section>
      <Progress.Section value={15} color="orange">
        <Progress.Label>其他</Progress.Label>
      </Progress.Section>
    </Progress.Root>
  );
}
`;

function Demo() {
  return (
    <Progress.Root size="xl">
      <Progress.Section value={35} color="cyan">
        <Progress.Label>文档</Progress.Label>
      </Progress.Section>
      <Progress.Section value={28} color="pink">
        <Progress.Label>照片</Progress.Label>
      </Progress.Section>
      <Progress.Section value={15} color="orange">
        <Progress.Label>其他</Progress.Label>
      </Progress.Section>
    </Progress.Root>
  );
}

export const compound: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
