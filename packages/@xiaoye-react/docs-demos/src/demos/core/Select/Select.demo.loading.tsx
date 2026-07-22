import { Select } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Select } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Select
      placeholder="选择值"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      loading
    />
  );
}
`;

function Demo() {
  return <Select placeholder="选择值" data={['React', 'Angular', 'Vue', 'Svelte']} loading />;
}

export const loading: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
