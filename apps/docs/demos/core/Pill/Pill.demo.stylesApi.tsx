import { Pill, PillProps } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { PillStylesApi } from '@xiaoye-react/docs-styles-api';
import classes from './_demo.module.css';

const code = `
import { Pill } from '@xiaoye-react/ui';
import classes from './Demo.module.css';

function Demo() {
  return <Pill{{props}} withRemoveButton>测试胶囊</Pill>;
}
`;

function Demo(props: PillProps) {
  return (
    <div className={classes.demoWrapper}>
      <Pill {...props} withRemoveButton style={{ flex: 0 }}>
        Test pill
      </Pill>
    </div>
  );
}

export const stylesApi: UIDemo = {
  type: 'styles-api',
  data: PillStylesApi,
  component: Demo,
  code,
  centered: true,
  maxWidth: 200,
};
