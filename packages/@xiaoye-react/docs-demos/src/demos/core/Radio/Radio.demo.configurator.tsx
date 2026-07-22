import { Radio, RadioProps } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Radio } from '@xiaoye-react/ui';


function Demo() {
  return (
    <Radio
      {{props}}
    />
  );
}
`;

function Wrapper(props: RadioProps) {
  return (
    <Radio.Group name="demo" defaultValue="react">
      <Radio value="react" {...props} />
    </Radio.Group>
  );
}

export const configurator: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  controls: [
    {
      prop: 'labelPosition',
      type: 'segmented',
      data: [
        { value: 'right', label: '右' },
        { value: 'left', label: '左' },
      ],
      initialValue: 'right',
      libraryValue: 'right',
    },
    { prop: 'label', type: 'string', initialValue: 'I cannot be unchecked', libraryValue: '' },
    { prop: 'description', type: 'string', initialValue: '', libraryValue: '' },
    { prop: 'error', type: 'string', initialValue: '', libraryValue: '' },
    { prop: 'size', type: 'size', initialValue: 'sm', libraryValue: 'sm' },
    { prop: 'color', type: 'color', initialValue: 'blue', libraryValue: 'blue' },
    {
      prop: 'variant',
      type: 'segmented',
      data: [
        { value: 'filled', label: '填充' },
        { value: 'outline', label: '轮廓' },
      ],
      initialValue: 'filled',
      libraryValue: 'filled',
    },
  ],
};
