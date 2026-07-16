import { Pill } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { PillStylesApi } from '@react-ui/docs-styles-api';
import classes from './_demo.module.css';

const code = `
import { Pill } from '@react-ui/ui';
import classes from './Demo.module.css';

function Demo() {
  return <Pill{{props}} withRemoveButton>测试胶囊</Pill>;
}
`;

function Demo(props: any) {
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
