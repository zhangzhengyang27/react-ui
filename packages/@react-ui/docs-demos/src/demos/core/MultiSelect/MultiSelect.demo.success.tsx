import { MultiSelect } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { MultiSelect } from '@react-ui/ui';

function Demo() {
  return <MultiSelect label="Multi Select" placeholder="Multi Select" data={['React', 'Angular', 'Vue', 'Svelte']} success="Looks good!" />;
}
`;

function Demo() {
  return (
    <MultiSelect
      label="Multi Select"
      placeholder="Multi Select"
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
