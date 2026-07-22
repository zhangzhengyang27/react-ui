import { Rating } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Rating } from '@xiaoye-react/ui';

function Demo() {
  return <Rating value={3.5} fractions={2} readOnly />;
}
`;

function Demo() {
  return <Rating value={3.5} fractions={2} readOnly />;
}

export const readOnly: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
