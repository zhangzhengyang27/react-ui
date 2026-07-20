import { AtIcon } from '@phosphor-icons/react';
import { JsonInput } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { JsonInputStylesApi } from '@react-ui/docs-styles-api';

const code = `
import { AtIcon } from '@phosphor-icons/react';
import { JsonInput } from '@react-ui/ui';

function Demo() {
  return (
    <JsonInput
      label="标签"
      placeholder="JSON 输入"
      description="描述"
      error="错误"
      withAsterisk
      leftSection={<AtIcon size={18} />}
      autosize
      {{props}}
    />
  );
}
`;

function Demo(props: any) {
  return (
    <JsonInput
      label="标签"
      placeholder="JSON 输入"
      description="描述"
      error="错误"
      withAsterisk
      leftSection={<AtIcon size={18} />}
      autosize
      {...props}
    />
  );
}

export const stylesApi: UIDemo = {
  type: 'styles-api',
  data: JsonInputStylesApi,
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
