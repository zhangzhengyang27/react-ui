import { Button, Group } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Group, Button } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Group{{props}}>
      <Button variant="default">第一</Button>
      <Button variant="default">第二</Button>
      <Button variant="default">第三</Button>
    </Group>
  );
}
`;

function Wrapper(props: any) {
  return (
    <Group {...props}>
      <Button variant="default">第一</Button>
      <Button variant="default">第二</Button>
      <Button variant="default">第三</Button>
    </Group>
  );
}

export const usage: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
    {
      type: 'select',
      prop: 'justify',
      data: ['flex-start', 'center', 'space-between', 'flex-end'],
      initialValue: 'flex-start',
      libraryValue: 'flex-start',
    },
    { type: 'size', prop: 'gap', initialValue: 'md', libraryValue: 'md' },
    { type: 'boolean', prop: 'grow', initialValue: false, libraryValue: false },
  ],
};
