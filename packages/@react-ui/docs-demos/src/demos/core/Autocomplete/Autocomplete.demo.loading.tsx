import { Autocomplete } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Autocomplete } from '@react-ui/ui';

function Demo() {
  return (
    <Autocomplete
      placeholder="Pick value"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      loading
    />
  );
}
`;

function Demo() {
  return (
    <Autocomplete placeholder="Pick value" data={['React', 'Angular', 'Vue', 'Svelte']} loading />
  );
}

export const loading: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
