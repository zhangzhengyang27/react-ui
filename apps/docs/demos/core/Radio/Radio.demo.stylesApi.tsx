import { Radio, RadioProps } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { RadioStylesApi } from '@xiaoye-react/docs-styles-api';

const code = `
import { Radio } from '@xiaoye-react/ui';

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

function Demo(props: RadioProps) {
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
