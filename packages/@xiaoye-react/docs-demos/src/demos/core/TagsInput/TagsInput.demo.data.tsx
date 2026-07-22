import { TagsInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { TagsInput } from '@xiaoye-react/ui';

function Demo() {
  return (
    <TagsInput
      label="按 Enter 提交标签"
      placeholder="从列表选择标签"
      data={['React', 'Angular', 'Svelte']}
    />
  );
}
`;

function Demo() {
  return (
    <TagsInput
      label="按 Enter 提交标签"
      placeholder="从列表选择标签"
      data={['React', 'Angular', 'Svelte']}
    />
  );
}

export const data: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
