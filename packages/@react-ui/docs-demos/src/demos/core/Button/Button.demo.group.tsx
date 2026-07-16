import { Button } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Button } from '@react-ui/ui';

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

function Wrapper(props: any) {
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
