import { Select } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Select } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Select
      label="你最喜欢的库"
      placeholder="选择值"
      autoSelectOnBlur
      searchable
      data={['React', 'Angular', 'Vue', 'Svelte']}
    />
  );
}
`;

function Demo() {
  return (
    <Select
      label="你最喜欢的库"
      placeholder="选择值"
      autoSelectOnBlur
      searchable
      data={['React', 'Angular', 'Vue', 'Svelte']}
    />
  );
}

export const autoSelectOnBlur: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
