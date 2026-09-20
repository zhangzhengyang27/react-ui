import { Button, Tooltip, TooltipProps } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

function Wrapper(props: Omit<TooltipProps, 'label'>) {
  return (
    <Tooltip label="提示" {...props}>
      <Button>带提示</Button>
    </Tooltip>
  );
}

const code = `
import { Tooltip, Button } from '@xiaoye-react/ui';

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
