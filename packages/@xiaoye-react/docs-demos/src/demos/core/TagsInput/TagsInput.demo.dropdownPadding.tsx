import { TagsInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { TagsInput } from '@xiaoye-react/ui';

function Demo() {
  return (
    <>
      <TagsInput
        label="零内边距"
        placeholder="选择值或输入任意内容"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        comboboxProps={{ dropdownPadding: 0 }}
      />
      <TagsInput
        mt="md"
        label="10px padding"
        placeholder="选择值或输入任意内容"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        comboboxProps={{ dropdownPadding: 10 }}
      />
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <TagsInput
        label="零内边距"
        placeholder="选择值或输入任意内容"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        comboboxProps={{ dropdownPadding: 0 }}
      />
      <TagsInput
        mt="md"
        label="10px padding"
        placeholder="选择值或输入任意内容"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        comboboxProps={{ dropdownPadding: 10 }}
      />
    </>
  );
}

export const dropdownPadding: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
