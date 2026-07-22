import { Switch } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { SwitchStylesApi } from '@xiaoye-react/docs-styles-api';

const code = `
import { Switch } from '@xiaoye-react/ui';

function Demo() {
  return <Switch{{props}} label="Switch 组件" description="Switch 描述" error="Switch 错误" />;
}
`;

function Demo(props: any) {
  return (
    <Switch
      {...props}
      label="Switch 组件"
      description="Switch 描述"
      error="Switch 错误"
    />
  );
}

export const stylesApi: UIDemo = {
  type: 'styles-api',
  data: SwitchStylesApi,
  component: Demo,
  centered: true,
  code,
};
