import { Switch } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { SwitchStylesApi } from '@react-ui/docs-styles-api';

const code = `
import { Switch } from '@react-ui/ui';

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
