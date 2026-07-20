import { Radio } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { RadioStylesApi } from '@react-ui/docs-styles-api';

const code = `
import { Radio } from '@react-ui/ui';

function Demo() {
  return (
    <Radio
      label="单选框"
      description="单选框描述"
      error="单选框错误"
      defaultChecked
     {{props}}
    />
  );
}
`;

function Demo(props: any) {
  return (
    <Radio
      label="单选框"
      description="单选框描述"
      error="单选框错误"
      defaultChecked
      {...props}
    />
  );
}

export const stylesApi: UIDemo = {
  type: 'styles-api',
  data: RadioStylesApi,
  component: Demo,
  code,
  centered: true,
};
