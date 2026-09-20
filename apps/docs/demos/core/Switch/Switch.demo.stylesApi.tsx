import { Switch, SwitchProps } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { SwitchStylesApi } from '@xiaoye-react/docs-styles-api';

const code = `
import { Switch } from '@xiaoye-react/ui';

function Demo() {
  return <Switch{{props}} label="Switch 组件" />;
}
`;

function Demo(props: SwitchProps) {
  return <Switch {...props} label="Switch 组件" />;
}

export const stylesApi: UIDemo = {
  type: 'styles-api',
  data: SwitchStylesApi,
  component: Demo,
  centered: true,
  code,
};
