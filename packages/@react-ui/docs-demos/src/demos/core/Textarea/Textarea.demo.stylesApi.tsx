import { AtIcon } from '@phosphor-icons/react';
import { Textarea } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';
import { TextareaStylesApi } from '@react-ui/docs-styles-api';

const code = `
import { AtIcon } from '@phosphor-icons/react';
import { Textarea } from '@react-ui/ui';

function Demo() {
  return (
    <Textarea
      label="Label"
      placeholder="Textarea"
      description="Description"
      error="Error"
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
      label="Label"
      placeholder="Textarea"
      description="Description"
      error="Error"
      withAsterisk
      leftSection={<AtIcon size={18} />}
      autosize
      {...props}
    />
  );
}

export const stylesApi: MantineDemo = {
  type: 'styles-api',
  data: TextareaStylesApi,
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
