import { AtIcon } from '@phosphor-icons/react';
import { TextInput } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { TextInputStylesApi } from '@react-ui/docs-styles-api';

const code = `
import { AtIcon } from '@phosphor-icons/react';
import { TextInput } from '@react-ui/ui';

function Demo() {
  return (
    <TextInput
      label="标签"
      placeholder="文本输入"
      description="描述"
      error="错误"
      withAsterisk
      leftSection={<AtIcon size={18} />}
      {{props}}
    />
  );
}
`;

function Demo(props: any) {
  return (
    <TextInput
      label="标签"
      placeholder="文本输入"
      description="描述"
      error="错误"
      withAsterisk
      leftSection={<AtIcon size={18} />}
      {...props}
    />
  );
}

export const stylesApi: UIDemo = {
  type: 'styles-api',
  data: TextInputStylesApi,
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
