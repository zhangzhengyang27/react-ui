import { TextInput } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { TextInput } from '@react-ui/ui';

function Demo() {
  return <TextInput placeholder="Your email" loading />;
}
`;

function Demo() {
  return <TextInput placeholder="Your email" loading />;
}

export const loading: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
