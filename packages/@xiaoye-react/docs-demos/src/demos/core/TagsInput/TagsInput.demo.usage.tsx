import { TagsInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { TagsInput } from '@xiaoye-react/ui';

function Demo() {
  return <TagsInput label="按 Enter 提交标签" placeholder="输入标签" />;
}
`;

function Demo() {
  return <TagsInput label="按 Enter 提交标签" placeholder="输入标签" />;
}

export const usage: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
