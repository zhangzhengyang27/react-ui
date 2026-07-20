import { Button, Tooltip } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

function Wrapper(props: any) {
  return (
    <Tooltip label="提示" {...props}>
      <Button>带提示</Button>
    </Tooltip>
  );
}

const code = `
import { Tooltip, Button } from '@react-ui/ui';

function Demo() {
  return (
    <Tooltip label="提示"{{props}}>
      <Button>带提示</Button>
    </Tooltip>
  );
}
`;

export const configurator: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  controls: [
    {
      prop: 'color',
      type: 'color',
      initialValue: 'blue',
      libraryValue: '__none__',
    },
  ],
};
