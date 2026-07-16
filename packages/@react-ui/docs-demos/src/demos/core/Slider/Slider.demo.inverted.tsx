import { Slider } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Slider } from '@react-ui/ui';

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
