import { Input } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { InputWrapperStylesApi } from '@react-ui/docs-styles-api';

const code = `
import { Input } from '@react-ui/ui';

function Demo() {
  return <Input.Wrapper{{props}} label="输入标签" description="输入描述" error="输入错误" withAsterisk />;
}
`;

function Demo(props: any) {
  return (
    <Input.Wrapper
      label="输入标签"
      description="输入描述"
      error="输入错误"
      withAsterisk
      {...props}
    >
      <Input placeholder="输入" />
    </Input.Wrapper>
  );
}

export const wrapperStylesApi: UIDemo = {
  type: 'styles-api',
  data: InputWrapperStylesApi,
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
