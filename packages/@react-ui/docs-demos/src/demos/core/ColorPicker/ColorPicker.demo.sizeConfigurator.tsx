import { ColorPicker, ColorPickerProps, DEFAULT_THEME } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

function Wrapper(props: ColorPickerProps) {
  return (
    <ColorPicker
      mx="auto"
      format="rgba"
      defaultValue="rgba(50, 151, 194, 1)"
      swatches={Object.keys(DEFAULT_THEME.colors).map((color) => DEFAULT_THEME.colors[color][6])}
      {...props}
    />
  );
}

const code = `
import { ColorPicker } from '@react-ui/ui';

function Demo() {
  return <ColorPicker{{props}} />;
}
`;

export const sizeConfigurator: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [{ prop: 'size', type: 'size', initialValue: 'sm', libraryValue: 'sm' }],
};
