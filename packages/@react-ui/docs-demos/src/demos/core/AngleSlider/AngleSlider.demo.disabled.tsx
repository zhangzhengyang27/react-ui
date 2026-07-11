import { AngleSlider } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { AngleSlider } from '@react-ui/ui';

function Demo() {
  return <AngleSlider aria-label="Angle slider" disabled />;
}
`;

function Demo() {
  return <AngleSlider aria-label="Angle slider" disabled />;
}

export const disabled: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
