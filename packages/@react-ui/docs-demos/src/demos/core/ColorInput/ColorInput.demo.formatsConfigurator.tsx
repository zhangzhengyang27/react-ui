import { ColorInput, ColorInputProps } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

function Wrapper(props: ColorInputProps) {
  return (
    <ColorInput
      maw={320}
      mx="auto"
      label="选择颜色格式"
      placeholder={props.format}
      defaultValue="#C5D899"
      {...props}
    />
  );
}

const code = `
import { ColorInput } from '@react-ui/ui';

function Demo() {
  return <ColorInput defaultValue="#C5D899"{{props}} />;
}
`;

export const formatsConfigurator: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
    {
      prop: 'format',
      type: 'select',
      initialValue: 'hex',
      libraryValue: 'hex',
      data: [
        { value: 'hex', label: 'HEX' },
        { value: 'hexa', label: 'HEXA' },
        { value: 'rgb', label: 'RGB' },
        { value: 'rgba', label: 'RGBA' },
        { value: 'hsl', label: 'HSL' },
        { value: 'hsla', label: 'HSLA' },
      ],
    },
  ],
};
