import { AngleSlider } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { AngleSlider } from '@xiaoye-react/ui';

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
