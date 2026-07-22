import { MultiSelect } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { MultiSelect } from '@xiaoye-react/ui';

function Demo() {
  return (
    <MultiSelect
      label="你最喜欢的库"
      placeholder="选择值"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      searchable
    />
  );
}
`;

function Demo() {
  return (
    <MultiSelect
      label="你最喜欢的库"
      placeholder="选择值"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      searchable
    />
  );
}

export const searchable: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
