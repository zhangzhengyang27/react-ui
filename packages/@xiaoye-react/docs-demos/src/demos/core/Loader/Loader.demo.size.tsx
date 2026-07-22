import { Loader } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Loader } from '@xiaoye-react/ui';

function Demo() {
  return <Loader{{props}} />;
}
`;

function Wrapper(props: any) {
  return <Loader {...props} />;
}

export const size: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  minHeight: 70,
  controls: [
    { type: 'number', prop: 'size', initialValue: 30, min: 10, max: 50, libraryValue: '__none__' },
  ],
};
