import { Autocomplete } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Autocomplete } from '@react-ui/ui';

const largeData = Array(100_000)
  .fill(0)
  .map((_, index) => \`Option \${index}\`);

function Demo() {
  return (
    <Autocomplete
      label="10 万个选项自动完成"
      placeholder="使用 limit 优化性能"
      limit={5}
      data={largeData}
    />
  );
}
`;

const largeData = Array(100_000)
  .fill(0)
  .map((_, index) => `Option ${index}`);

function Demo() {
  return (
    <Autocomplete
      label="10 万个选项自动完成"
      placeholder="使用 limit 优化性能"
      limit={5}
      data={largeData}
    />
  );
}

export const limit: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
