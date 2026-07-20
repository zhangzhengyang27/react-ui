import { RingProgress } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { RingProgress } from '@react-ui/ui';

function Demo() {
  return <RingProgress sections={[{ value: 40, color: 'yellow' }]} rootColor="red" />;
}
`;

function Demo() {
  return <RingProgress sections={[{ value: 40, color: 'yellow' }]} rootColor="red" />;
}

export const rootColor: UIDemo = {
  type: 'code',
  code,
  centered: true,
  component: Demo,
};
