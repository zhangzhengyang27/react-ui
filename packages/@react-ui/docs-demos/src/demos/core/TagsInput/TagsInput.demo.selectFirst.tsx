import { TagsInput } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { TagsInput } from '@react-ui/ui';

function Demo() {
  return (
    <TagsInput
      label="Enter tags"
      placeholder="Enter tags"
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
      label="Enter tags"
      placeholder="Enter tags"
      selectFirstOptionOnChange
      data={['Apple', 'Banana', 'Kiwi', 'Mango', 'Watermelon', 'Raspberry', 'Strawberry']}
    />
  );
}

export const selectFirst: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
