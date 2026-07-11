import { Radio } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';
import { RadioStylesApi } from '@react-ui/docs-styles-api';

const code = `
import { Radio } from '@react-ui/ui';

function Demo() {
  return (
    <Radio
      label="Radio"
      description="Radio description"
      error="Radio error"
      defaultChecked
     {{props}}
    />
  );
}
`;

function Demo(props: any) {
  return (
    <Radio
      label="Radio"
      description="Radio description"
      error="Radio error"
      defaultChecked
      {...props}
    />
  );
}

export const stylesApi: MantineDemo = {
  type: 'styles-api',
  data: RadioStylesApi,
  component: Demo,
  code,
  centered: true,
};
