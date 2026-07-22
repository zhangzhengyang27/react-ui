import { RangeSlider } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { RangeSlider } from '@xiaoye-react/ui';

function Demo() {
  return <RangeSlider pushOnOverlap={false} defaultValue={[25, 65]} minRange={20} />;
}
`;

function Demo() {
  return <RangeSlider pushOnOverlap={false} defaultValue={[25, 65]} minRange={20} />;
}

export const pushOnOverlap: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
