import { Textarea } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Textarea } from '@react-ui/ui';

function Demo() {
  return <Textarea label="Textarea" placeholder="Textarea" success="Looks good!" />;
}
`;

function Demo() {
  return <Textarea label="Textarea" placeholder="Textarea" success="Looks good!" />;
}

export const success: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
