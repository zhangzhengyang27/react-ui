import { Textarea } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Textarea } from '@react-ui/ui';

function Demo() {
  return <Textarea label="Disabled" placeholder="Your comment" disabled />;
}
`;

function Demo() {
  return <Textarea label="Disabled" placeholder="Your comment" disabled />;
}

export const disabled: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
  maxWidth: 340,
};
