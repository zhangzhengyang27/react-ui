import { Slider } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

function Wrapper(props: any) {
  return <Slider {...props} defaultValue={20} />;
}

const code = `
import { Slider } from '@xiaoye-react/ui';

function Demo() {
  return <Slider{{props}} defaultValue={20} />;
}
`;

export const thumbSize: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  maxWidth: 400,
  centered: true,
  controls: [
    { prop: 'thumbSize', type: 'number', min: 16, max: 32, initialValue: 14, libraryValue: null },
  ],
};
