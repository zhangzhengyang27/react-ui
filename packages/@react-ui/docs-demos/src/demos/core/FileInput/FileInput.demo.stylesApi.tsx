import { AtIcon } from '@phosphor-icons/react';
import { FileInput } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';
import { FileInputStylesApi } from '@react-ui/docs-styles-api';

const code = `
import { AtIcon } from '@phosphor-icons/react';
import { FileInput } from '@react-ui/ui';

function Demo() {
  return (
    <FileInput
      label="Label"
      placeholder="FileInput"
      description="Description"
      error="Error"
      withAsterisk
      leftSection={<AtIcon size={18} />}
      {{props}}
    />
  );
}
`;

function Demo(props: any) {
  return (
    <FileInput
      label="Label"
      placeholder="FileInput"
      description="Description"
      error="Error"
      withAsterisk
      leftSection={<AtIcon size={18} />}
      {...props}
    />
  );
}

export const stylesApi: MantineDemo = {
  type: 'styles-api',
  data: FileInputStylesApi,
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
