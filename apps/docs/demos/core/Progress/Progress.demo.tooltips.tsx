import { Progress, Tooltip } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Progress, Tooltip } from '@react-ui/ui';

function Demo() {
  return (
    <Progress.Root size={40}>
      <Tooltip label="文档 – 33Gb">
        <Progress.Section value={33} color="cyan">
          <Progress.Label>文档</Progress.Label>
        </Progress.Section>
      </Tooltip>

      <Tooltip label="照片 – 28Gb">
        <Progress.Section value={28} color="pink">
          <Progress.Label>照片</Progress.Label>
        </Progress.Section>
      </Tooltip>

      <Tooltip label="其他 – 15Gb">
        <Progress.Section value={15} color="orange">
          <Progress.Label>其他</Progress.Label>
        </Progress.Section>
      </Tooltip>
    </Progress.Root>
  );
}
`;

function Demo() {
  return (
    <Progress.Root size={40}>
      <Tooltip label="文档 – 33Gb">
        <Progress.Section value={33} color="cyan">
          <Progress.Label>文档</Progress.Label>
        </Progress.Section>
      </Tooltip>

      <Tooltip label="照片 – 28Gb">
        <Progress.Section value={28} color="pink">
          <Progress.Label>照片</Progress.Label>
        </Progress.Section>
      </Tooltip>

      <Tooltip label="其他 – 15Gb">
        <Progress.Section value={15} color="orange">
          <Progress.Label>其他</Progress.Label>
        </Progress.Section>
      </Tooltip>
    </Progress.Root>
  );
}

export const tooltips: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
