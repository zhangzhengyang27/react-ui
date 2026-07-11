import { Checkbox } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';
import { CheckboxStylesApi } from '@react-ui/docs-styles-api';

const code = `
import { Checkbox } from '@react-ui/ui';

function Demo() {
  return (
    <Checkbox
      label="Checkbox"
      description="Checkbox description"
      error="Checkbox error"
      defaultChecked
     {{props}}
    />
  );
}
`;

function Demo(props: any) {
  return (
    <Checkbox
      label="Checkbox"
      description="Checkbox description"
      error="Checkbox error"
      defaultChecked
      {...props}
    />
  );
}

export const stylesApi: MantineDemo = {
  type: 'styles-api',
  data: CheckboxStylesApi,
  component: Demo,
  code,
  centered: true,
};
