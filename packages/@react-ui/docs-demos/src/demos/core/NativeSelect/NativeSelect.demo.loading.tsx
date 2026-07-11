import { NativeSelect } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { NativeSelect } from '@react-ui/ui';

function Demo() {
  return (
    <NativeSelect
      label="Your favorite framework"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      loading
    />
  );
}
`;

function Demo() {
  return (
    <NativeSelect
      label="Your favorite framework"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      loading
    />
  );
}

export const loading: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
