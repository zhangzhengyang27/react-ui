import { RangeSlider } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { RangeSlider } from '@react-ui/ui';

function Demo() {
  return <RangeSlider inverted defaultValue={[20, 60]} />;
}
`;

function Demo() {
  return <RangeSlider inverted defaultValue={[20, 60]} />;
}

export const inverted: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 400,
};
