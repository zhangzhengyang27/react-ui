import { Chip, ChipProps } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

function Wrapper(props: ChipProps) {
  return (
    <Chip defaultChecked {...props}>
      Awesome chip
    </Chip>
  );
}

const code = `
import { Chip } from '@xiaoye-react/ui';

function Demo() {
  return <Chip defaultChecked{{props}}>很棒的芯片</Chip>
}
`;

export const configurator: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  controls: [
    { prop: 'color', type: 'color', initialValue: 'blue', libraryValue: 'blue' },
    {
      prop: 'variant',
      type: 'segmented',
      data: [
        { value: 'filled', label: '填充' },
        { value: 'outline', label: '轮廓' },
        { value: 'light', label: '浅色' },
      ],
      initialValue: 'filled',
      libraryValue: 'filled',
    },
    { prop: 'size', type: 'size', initialValue: 'sm', libraryValue: 'sm' },
    { prop: 'radius', type: 'size', initialValue: 'xl', libraryValue: 'xl' },
  ],
};
