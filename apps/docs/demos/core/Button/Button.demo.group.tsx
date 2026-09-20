import { Button, ButtonProps } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Button } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Button.Group{{props}}>
      <Button variant="default">第一</Button>
      <Button variant="default">第二</Button>
      <Button variant="default">第三</Button>
    </Button.Group>
  );
}
`;

function Wrapper(props: ButtonProps) {
  return (
    <Button.Group {...props}>
      <Button variant="default">第一</Button>
      <Button variant="default">第二</Button>
      <Button variant="default">第三</Button>
    </Button.Group>
  );
}

export const group: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  title: '按钮组',
  description: '使用 Button.Group 将多个按钮组合在一起。',
  centered: true,
  controls: [
    {
      type: 'segmented',
      prop: 'orientation',
      data: ['horizontal', 'vertical'],
      initialValue: 'horizontal',
      libraryValue: 'horizontal',
    },
  ],
};
