import { TagsInput } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { TagsInput } from '@react-ui/ui';

function Demo() {
  return (
    <TagsInput
      label="按 Enter 提交标签"
      placeholder="输入标签"
      splitChars={[',', ' ', '|']}
    />
  );
}
`;

function Demo() {
  return (
    <TagsInput
      label="按 Enter 提交标签"
      placeholder="输入标签"
      splitChars={[',', ' ', '|']}
    />
  );
}

export const splitChars: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
