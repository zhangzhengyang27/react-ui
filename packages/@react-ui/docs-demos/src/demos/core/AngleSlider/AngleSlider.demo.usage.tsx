import { AngleSlider } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { AngleSlider } from '@react-ui/ui';

function Demo() {
  return <AngleSlider aria-label="角度滑块"{{props}} />;
}
`;

function Wrapper(props: any) {
  return <AngleSlider aria-label="角度滑块" {...props} />;
}

export const usage: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  controls: [
    { type: 'number', prop: 'size', initialValue: 60, libraryValue: '__', min: 50, max: 200 },
    { type: 'number', prop: 'thumbSize', initialValue: 8, libraryValue: '__', min: 1, max: 100 },
    { type: 'boolean', prop: 'withLabel', initialValue: true, libraryValue: true },
  ],
};
