import { AtIcon } from '@phosphor-icons/react';
import { JsonInput } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';
import { JsonInputStylesApi } from '@react-ui/docs-styles-api';

const code = `
import { AtIcon } from '@phosphor-icons/react';
import { JsonInput } from '@react-ui/ui';

function Demo() {
  return (
    <JsonInput
      label="Label"
      placeholder="JsonInput"
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
    <JsonInput
      label="Label"
      placeholder="JsonInput"
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
  data: JsonInputStylesApi,
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
