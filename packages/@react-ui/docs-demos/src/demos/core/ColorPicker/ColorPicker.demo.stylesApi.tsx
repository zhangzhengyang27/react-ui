import { ColorPicker } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';
import { ColorPickerStylesApi } from '@react-ui/docs-styles-api';

const code = `
import { ColorPicker } from '@react-ui/ui';

function Demo() {
  return (
    <ColorPicker format="rgba" size="lg"{{props}} swatches={['#25262b', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5']} />
  );
}
`;

function Demo(props: any) {
  return (
    <ColorPicker
      size="lg"
      format="rgba"
      swatches={['#25262b', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5']}
      {...props}
    />
  );
}

export const stylesApi: MantineDemo = {
  type: 'styles-api',
  data: ColorPickerStylesApi,
  component: Demo,
  centered: true,
  code,
};
