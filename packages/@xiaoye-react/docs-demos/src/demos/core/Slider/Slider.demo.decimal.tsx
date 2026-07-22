import { Slider } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Slider } from '@xiaoye-react/ui';

function Demo() {
  return <Slider min={0} max={1} step={0.0005} defaultValue={0.5535} />;
}
`;

function Demo() {
  return <Slider min={0} max={1} step={0.0005} defaultValue={0.5535} />;
}

export const decimal: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
