import { NativeSelect } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { NativeSelect } from '@react-ui/ui';

function Demo() {
  return <NativeSelect label="Native Select" data={['React', 'Angular', 'Vue', 'Svelte']} success="Looks good!" />;
}
`;

function Demo() {
  return (
    <NativeSelect
      label="Native Select"
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
