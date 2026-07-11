import { Switch } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';
import { SwitchStylesApi } from '@react-ui/docs-styles-api';

const code = `
import { Switch } from '@react-ui/ui';

function Demo() {
  return <Switch{{props}} label="Switch component" description="Switch description" error="Switch error" />;
}
`;

function Demo(props: any) {
  return (
    <Switch
      {...props}
      label="Switch component"
      description="Switch description"
      error="Switch error"
    />
  );
}

export const stylesApi: MantineDemo = {
  type: 'styles-api',
  data: SwitchStylesApi,
  component: Demo,
  centered: true,
  code,
};
