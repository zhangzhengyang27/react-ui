import { NativeSelect } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { NativeSelectStylesApi } from '@react-ui/docs-styles-api';

const code = `
import { NativeSelect } from '@react-ui/ui';

function Demo() {
  return <NativeSelect{{props}} data={['React', 'Angular']} label="NativeSelect 标签" description="NativeSelect 描述" error="NativeSelect 错误" withAsterisk />;
}
`;

function Demo(props: any) {
  return (
    <NativeSelect
      {...props}
      data={['React', 'Angular']}
      label="NativeSelect 标签"
      description="NativeSelect 描述"
      error="NativeSelect 错误"
      withAsterisk
    />
  );
}

export const stylesApi: UIDemo = {
  type: 'styles-api',
  data: NativeSelectStylesApi,
  component: Demo,
  centered: true,
  maxWidth: 340,
  code,
};
