import { Textarea } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Textarea } from '@react-ui/ui';

function Demo() {
  return <Textarea placeholder="Your comment" loading />;
}
`;

function Demo() {
  return <Textarea placeholder="Your comment" loading />;
}

export const loading: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
