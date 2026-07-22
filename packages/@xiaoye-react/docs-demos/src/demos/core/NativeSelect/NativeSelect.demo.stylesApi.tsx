import { NativeSelect } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { NativeSelectStylesApi } from '@xiaoye-react/docs-styles-api';

const code = `
import { NativeSelect } from '@xiaoye-react/ui';

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
