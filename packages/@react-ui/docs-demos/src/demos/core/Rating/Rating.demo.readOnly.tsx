import { Rating } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Rating } from '@react-ui/ui';

function Demo() {
  return <Rating value={3.5} fractions={2} readOnly />;
}
`;

function Demo() {
  return <Rating value={3.5} fractions={2} readOnly />;
}

export const readOnly: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
