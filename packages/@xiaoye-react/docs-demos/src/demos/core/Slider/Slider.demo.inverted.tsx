import { Slider } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Slider } from '@xiaoye-react/ui';

function Demo() {
  return <Slider inverted defaultValue={80} />;
}
`;

function Demo() {
  return <Slider inverted defaultValue={80} />;
}

export const inverted: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 400,
};
