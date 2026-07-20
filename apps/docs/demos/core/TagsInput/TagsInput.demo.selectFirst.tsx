import { TagsInput } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { TagsInput } from '@react-ui/ui';

function Demo() {
  return (
    <TagsInput
      label="输入标签"
      placeholder="输入标签"
      selectFirstOptionOnChange
      data={[
        'Apple', 'Banana', 'Kiwi', 'Mango', 'Watermelon', 'Raspberry', 'Strawberry',
      ]}
    />
  );
}
`;

function Demo() {
  return (
    <TagsInput
      label="输入标签"
      placeholder="输入标签"
      selectFirstOptionOnChange
      data={['Apple', 'Banana', 'Kiwi', 'Mango', 'Watermelon', 'Raspberry', 'Strawberry']}
    />
  );
}

export const selectFirst: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
