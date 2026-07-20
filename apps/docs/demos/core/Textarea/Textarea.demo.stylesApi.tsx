import { AtIcon } from '@phosphor-icons/react';
import { Textarea } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { TextareaStylesApi } from '@react-ui/docs-styles-api';

const code = `
import { AtIcon } from '@phosphor-icons/react';
import { Textarea } from '@react-ui/ui';

function Demo() {
  return (
    <Textarea
      label="标签"
      placeholder="文本域"
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
    <Textarea
      label="标签"
      placeholder="文本域"
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
  data: TextareaStylesApi,
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
