import { MultiSelect } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { MultiSelect } from '@react-ui/ui';

function Demo() {
  return (
    <MultiSelect
      placeholder="选择值"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      loading
    />
  );
}
`;

function Demo() {
  return (
    <MultiSelect placeholder="选择值" data={['React', 'Angular', 'Vue', 'Svelte']} loading />
  );
}

export const loading: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
