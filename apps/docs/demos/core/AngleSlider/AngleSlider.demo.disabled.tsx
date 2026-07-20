import { AngleSlider } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { AngleSlider } from '@react-ui/ui';

function Demo() {
  return <AngleSlider aria-label="角度滑块" disabled />;
}
`;

function Demo() {
  return <AngleSlider aria-label="角度滑块" disabled />;
}

export const disabled: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
