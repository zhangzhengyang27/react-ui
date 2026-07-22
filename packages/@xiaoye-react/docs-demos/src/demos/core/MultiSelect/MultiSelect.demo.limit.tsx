import { MultiSelect } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { MultiSelect } from '@xiaoye-react/ui';

const largeData = Array(100_000)
  .fill(0)
  .map((_, index) => \`Option \${index}\`);

function Demo() {
  return (
    <MultiSelect
      label="10 万个选项自动完成"
      placeholder="使用 limit 优化性能"
      limit={5}
      data={largeData}
      searchable
    />
  );
}
`;

const largeData = Array(100_000)
  .fill(0)
  .map((_, index) => `Option ${index}`);

function Demo() {
  return (
    <MultiSelect
      label="10 万个选项自动完成"
      placeholder="使用 limit 优化性能"
      limit={5}
      data={largeData}
      searchable
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
