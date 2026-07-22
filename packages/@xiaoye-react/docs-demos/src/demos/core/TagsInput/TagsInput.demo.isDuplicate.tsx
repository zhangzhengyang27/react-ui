import { TagsInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { TagsInput } from '@xiaoye-react/ui';

function Demo() {
  return (
    <TagsInput
      label="按 Enter 提交标签"
      placeholder="输入标签"
      isDuplicate={(tagValue, currentTags) => currentTags.some((val) => val === tagValue)}
      defaultValue={['Tag', 'TAG', 'tag']}
    />
  );
}
`;

function Demo() {
  return (
    <TagsInput
      label="按 Enter 提交标签"
      placeholder="输入标签"
      isDuplicate={(tagValue, currentTags) => currentTags.some((val) => val === tagValue)}
      defaultValue={['Tag', 'TAG', 'tag']}
    />
  );
}

export const isDuplicate: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
