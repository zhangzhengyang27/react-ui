import { Button, Flex, FlexProps } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

function Wrapper(props: FlexProps) {
  return (
    <Flex mih={50} bg="rgba(0, 0, 0, .3)" {...props}>
      <Button>按钮 1</Button>
      <Button>按钮 2</Button>
      <Button>按钮 3</Button>
    </Flex>
  );
}

const code = `
import { Flex, Button } from '@xiaoye-react/ui';


function Demo() {
  return (
    <Flex
      mih={50}
      bg="rgba(0, 0, 0, .3)"
      {{props}}
    >
      <Button>按钮 1</Button>
      <Button>按钮 2</Button>
      <Button>按钮 3</Button>
    </Flex>
  );
}
`;

export const configurator: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
    { prop: 'gap', type: 'size', initialValue: 'md', libraryValue: null },
    {
      prop: 'justify',
      type: 'select',
      data: [
        { value: 'flex-start', label: 'flex-start' },
        { value: 'center', label: 'center' },
        { value: 'flex-end', label: 'flex-end' },
      ],
      initialValue: 'flex-start',
      libraryValue: null,
    },
    {
      prop: 'align',
      type: 'select',
      data: [
        { value: 'flex-start', label: 'flex-start' },
        { value: 'center', label: 'center' },
        { value: 'flex-end', label: 'flex-end' },
      ],
      initialValue: 'flex-start',
      libraryValue: null,
    },
    {
      prop: 'direction',
      type: 'select',
      data: [
        { value: 'row', label: 'row' },
        { value: 'column', label: 'column' },
        { value: 'row-reverse', label: 'row-reverse' },
        { value: 'column-reverse', label: 'column-reverse' },
      ],
      initialValue: 'row',
      libraryValue: null,
    },
    {
      prop: 'wrap',
      type: 'select',
      data: [
        { value: 'wrap', label: 'wrap' },
        { value: 'nowrap', label: 'nowrap' },
        { value: 'wrap-reverse', label: 'wrap-reverse' },
      ],
      initialValue: 'wrap',
      libraryValue: null,
    },
  ],
};
