import { TagsInput } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { TagsInput } from '@react-ui/ui';

function Demo() {
  return (
    <TagsInput
      label="按 Enter 提交标签"
      description="最多添加 3 个标签"
      placeholder="输入标签"
      maxTags={3}
      defaultValue={['first', 'second']}
    />
  );
}
`;

function Demo() {
  return (
    <TagsInput
      label="按 Enter 提交标签"
      description="最多添加 3 个标签"
      placeholder="输入标签"
      maxTags={3}
      defaultValue={['first', 'second']}
    />
  );
}

export const maxTags: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
