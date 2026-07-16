import { AtIcon } from '@phosphor-icons/react';
import { NumberInput } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { NumberInputStylesApi } from '@react-ui/docs-styles-api';

const code = `
import { AtIcon } from '@phosphor-icons/react';
import { NumberInput } from '@react-ui/ui';

function Demo() {
  return (
    <NumberInput
      label="标签"
      placeholder="数字输入"
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
    <NumberInput
      label="标签"
      placeholder="数字输入"
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
  data: NumberInputStylesApi,
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
