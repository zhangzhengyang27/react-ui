import { AtIcon } from '@phosphor-icons/react';
import { TextInput } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';
import { TextInputStylesApi } from '@react-ui/docs-styles-api';

const code = `
import { AtIcon } from '@phosphor-icons/react';
import { TextInput } from '@react-ui/ui';

function Demo() {
  return (
    <TextInput
      label="Label"
      placeholder="TextInput"
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
    <TextInput
      label="Label"
      placeholder="TextInput"
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
  data: TextInputStylesApi,
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
