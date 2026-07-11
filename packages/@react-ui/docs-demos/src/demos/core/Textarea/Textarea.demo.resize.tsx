import { Textarea } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Textarea } from '@react-ui/ui';

function Demo() {
  return <Textarea resize="vertical" label="Disabled" placeholder="Your comment" />;
}
`;

function Demo() {
  return <Textarea resize="vertical" label="Disabled" placeholder="Your comment" />;
}

export const resize: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
  maxWidth: 340,
};
