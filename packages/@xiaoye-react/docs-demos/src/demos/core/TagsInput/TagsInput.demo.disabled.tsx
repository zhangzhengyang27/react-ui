import { TagsInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { TagsInput } from '@xiaoye-react/ui';

function Demo() {
  return (
    <TagsInput
      label="已禁用"
      placeholder="输入标签"
      disabled
      defaultValue={['First', 'Second']}
    />
  );
}
`;

function Demo() {
  return (
    <TagsInput
      label="已禁用"
      placeholder="输入标签"
      disabled
      defaultValue={['First', 'Second']}
    />
  );
}

export const disabled: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
