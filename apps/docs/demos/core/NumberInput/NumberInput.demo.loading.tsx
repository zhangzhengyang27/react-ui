import { NumberInput } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { NumberInput } from '@react-ui/ui';

function Demo() {
  return <NumberInput placeholder="年龄" loading />;
}
`;

function Demo() {
  return <NumberInput placeholder="年龄" loading />;
}

export const loading: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
