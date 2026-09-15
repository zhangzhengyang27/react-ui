import { Calendar } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Calendar } from '@xiaoye-react/ui';

function Demo() {
  return <Calendar fullWidth />;
}
`;

function Demo() {
  return <Calendar fullWidth />;
}

export const fullWidth: UIDemo = {
  type: 'code',
  centered: true,
  maxWidth: 600,
  component: Demo,
  code,
};
