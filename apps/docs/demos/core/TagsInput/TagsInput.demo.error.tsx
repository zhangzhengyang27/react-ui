import { TagsInput } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { TagsInput } from '@react-ui/ui';

function Demo() {
  return (
    <>
      <TagsInput
        label="布尔错误"
        placeholder="布尔错误"
        error
        defaultValue={['React', 'Angular']}
      />
      <TagsInput
        mt="md"
        label="带错误信息"
        placeholder="带错误信息"
        error="无效的名称"
        defaultValue={['React', 'Angular']}
      />
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <TagsInput
        label="布尔错误"
        placeholder="布尔错误"
        error
        defaultValue={['React', 'Angular']}
      />
      <TagsInput
        mt="md"
        label="带错误信息"
        placeholder="带错误信息"
        error="无效的名称"
        defaultValue={['React', 'Angular']}
      />
    </>
  );
}

export const error: UIDemo = {
  type: 'code',
  component: Demo,
  maxWidth: 340,
  centered: true,
  code,
};
