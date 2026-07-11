import { Slider } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Slider } from '@react-ui/ui';

function Demo() {
  return <Slider defaultValue={60} disabled />;
}
`;

function Demo() {
  return <Slider defaultValue={60} disabled />;
}

export const disabled: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
