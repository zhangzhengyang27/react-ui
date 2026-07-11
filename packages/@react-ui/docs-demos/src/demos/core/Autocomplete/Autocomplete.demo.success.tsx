import { Autocomplete } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Autocomplete } from '@react-ui/ui';

function Demo() {
  return <Autocomplete label="Autocomplete" placeholder="Autocomplete" data={['React', 'Angular', 'Vue', 'Svelte']} success="Looks good!" />;
}
`;

function Demo() {
  return (
    <Autocomplete
      label="Autocomplete"
      placeholder="Autocomplete"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      success="Looks good!"
    />
  );
}

export const success: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
