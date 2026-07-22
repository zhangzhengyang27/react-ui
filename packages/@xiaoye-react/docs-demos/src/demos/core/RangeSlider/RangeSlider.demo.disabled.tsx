import { RangeSlider } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { RangeSlider } from '@xiaoye-react/ui';

function Demo() {
  return <RangeSlider defaultValue={[20, 60]} disabled />;
}
`;

function Demo() {
  return <RangeSlider defaultValue={[20, 60]} disabled />;
}

export const disabled: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
