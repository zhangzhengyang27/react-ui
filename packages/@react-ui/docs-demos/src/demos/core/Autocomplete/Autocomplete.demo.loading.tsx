import { Autocomplete } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Autocomplete } from '@react-ui/ui';

function Demo() {
  return (
    <Autocomplete
      placeholder="选择值"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      loading
    />
  );
}
`;

function Demo() {
  return (
    <Autocomplete placeholder="选择值" data={['React', 'Angular', 'Vue', 'Svelte']} loading />
  );
}

export const loading: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
