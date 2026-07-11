import { ColorInput } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';
import { ColorInputStylesApi } from '@react-ui/docs-styles-api';

const code = `
import { ColorInput } from '@react-ui/ui';

function Demo() {
  return (
    <ColorInput
      label="Label"
      placeholder="ColorInput"
      description="Description"
      error="Error"
      withAsterisk
      swatches={['#000', '#fff', '#f00', '#0f0', '#00f']}
      format="rgba"
      {{props}}
    />
  );
}
`;

function Demo(props: any) {
  return (
    <ColorInput
      label="Label"
      placeholder="ColorInput"
      description="Description"
      error="Error"
      withAsterisk
      swatches={['#000', '#fff', '#f00', '#0f0', '#00f']}
      format="rgba"
      classNames={props.classNames}
    />
  );
}

export const stylesApi: MantineDemo = {
  type: 'styles-api',
  data: ColorInputStylesApi,
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
