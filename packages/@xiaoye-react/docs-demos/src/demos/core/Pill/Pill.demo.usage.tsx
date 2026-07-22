import { Pill } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import classes from './_demo.module.css';

const code = `
import { Pill } from '@xiaoye-react/ui';

function Demo() {
  return <Pill{{props}}>React</Pill>;
}
`;

function Wrapper(props: any) {
  return (
    <div className={classes.demoWrapper}>
      <Pill {...props}>React</Pill>
    </div>
  );
}

export const usage: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  controls: [
    { type: 'size', prop: 'size', initialValue: 'md', libraryValue: 'md' },
    { type: 'boolean', prop: 'withRemoveButton', initialValue: false, libraryValue: false },
  ],
};
