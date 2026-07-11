import { Select } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Select } from '@react-ui/ui';

function Demo() {
  return (
    <>
      <Select
        label="Opens on focus"
        placeholder="Pick value"
        searchable
        openOnFocus
        data={['React', 'Angular', 'Vue', 'Svelte']}
      />
      <Select
        label="Does not open on focus"
        placeholder="Pick value"
        searchable
        openOnFocus={false}
        data={['React', 'Angular', 'Vue', 'Svelte']}
      />
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <Select
        label="Opens on focus"
        placeholder="Pick value"
        searchable
        openOnFocus
        data={['React', 'Angular', 'Vue', 'Svelte']}
      />
      <Select
        label="Does not open on focus"
        placeholder="Pick value"
        searchable
        openOnFocus={false}
        data={['React', 'Angular', 'Vue', 'Svelte']}
      />
    </>
  );
}

export const openOnFocus: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
};
