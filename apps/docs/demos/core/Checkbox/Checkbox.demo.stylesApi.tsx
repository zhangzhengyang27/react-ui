import { Checkbox } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { CheckboxStylesApi } from '@react-ui/docs-styles-api';

const code = `
import { Checkbox } from '@react-ui/ui';

function Demo() {
  return (
    <Checkbox
      label="复选框"
      description="复选框描述"
      error="复选框错误"
      defaultChecked
     {{props}}
    />
  );
}
`;

function Demo(props: any) {
  return (
    <Checkbox
      label="复选框"
      description="复选框描述"
      error="复选框错误"
      defaultChecked
      {...props}
    />
  );
}

export const stylesApi: UIDemo = {
  type: 'styles-api',
  data: CheckboxStylesApi,
  component: Demo,
  code,
  centered: true,
};
