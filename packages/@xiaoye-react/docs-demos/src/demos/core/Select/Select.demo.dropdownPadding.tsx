import { Select } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Select } from '@xiaoye-react/ui';

function Demo() {
  return (
    <>
      <Select
        label="零内边距"
        placeholder="选择值"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        comboboxProps={{ dropdownPadding: 0 }}
      />
      <Select
        mt="md"
        label="10px padding"
        placeholder="选择值"
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
      <Select
        label="零内边距"
        placeholder="选择值"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        comboboxProps={{ dropdownPadding: 0 }}
      />
      <Select
        mt="md"
        label="10px padding"
        placeholder="选择值"
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
