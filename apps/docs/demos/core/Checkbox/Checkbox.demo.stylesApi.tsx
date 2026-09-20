import { Checkbox, CheckboxProps } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { CheckboxStylesApi } from '@xiaoye-react/docs-styles-api';

const code = `
import { Checkbox } from '@xiaoye-react/ui';

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

function Demo(props: CheckboxProps) {
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
