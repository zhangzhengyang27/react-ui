import { TextInput } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { TextInput } from '@react-ui/ui';

function Demo() {
  return <TextInput label="Text Input" placeholder="Text Input" success="Looks good!" />;
}
`;

function Demo() {
  return <TextInput label="Text Input" placeholder="Text Input" success="Looks good!" />;
}

export const success: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
