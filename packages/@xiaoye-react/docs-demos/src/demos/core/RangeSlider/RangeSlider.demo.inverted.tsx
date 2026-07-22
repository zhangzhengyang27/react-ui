import { RangeSlider } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { RangeSlider } from '@xiaoye-react/ui';

function Demo() {
  return <RangeSlider inverted defaultValue={[20, 60]} />;
}
`;

function Demo() {
  return <RangeSlider inverted defaultValue={[20, 60]} />;
}

export const inverted: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 400,
};
