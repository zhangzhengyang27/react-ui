import { Input, InputWrapperProps } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { InputWrapperStylesApi } from '@xiaoye-react/docs-styles-api';

const code = `
import { Input } from '@xiaoye-react/ui';

function Demo() {
  return <Input.Wrapper{{props}} label="输入标签" description="输入描述" error="输入错误" withAsterisk />;
}
`;

function Demo(props: InputWrapperProps) {
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
