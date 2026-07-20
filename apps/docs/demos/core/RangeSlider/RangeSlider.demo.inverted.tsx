import { RangeSlider } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { RangeSlider } from '@react-ui/ui';

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
