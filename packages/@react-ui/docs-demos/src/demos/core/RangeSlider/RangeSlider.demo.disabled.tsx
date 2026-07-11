import { RangeSlider } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { RangeSlider } from '@react-ui/ui';

function Demo() {
  return <RangeSlider defaultValue={[20, 60]} disabled />;
}
`;

function Demo() {
  return <RangeSlider defaultValue={[20, 60]} disabled />;
}

export const disabled: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
