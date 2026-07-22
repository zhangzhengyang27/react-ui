import { RingProgress } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { RingProgress } from '@xiaoye-react/ui';

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
