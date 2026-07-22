import { MultiSelect } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { MultiSelect } from '@xiaoye-react/ui';

function Demo() {
  return (
    <MultiSelect
      label="你最喜欢的库"
      placeholder="最多选择 2 个库"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      maxValues={2}
    />
  );
}
`;

function Demo() {
  return (
    <MultiSelect
      label="你最喜欢的库"
      placeholder="最多选择 2 个库"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      maxValues={2}
    />
  );
}

export const maxValues: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
