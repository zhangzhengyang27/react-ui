import { Button } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Button } from '@react-ui/ui';

function Demo() {
  return (
    <Button
      component="a"
      href="#"
      data-disabled
      onClick={(event) => event.preventDefault()}
    >
      禁用链接
    </Button>
  );
}
`;

function Demo() {
  return (
    <Button
      component="a"
      href="#"
      data-disabled
      onClick={(event) => event.preventDefault()}
    >
      禁用链接
    </Button>
  );
}

export const disabledLink: UIDemo = {
  type: 'code',
  component: Demo,
  title: '禁用链接',
  description: '为作为链接渲染的按钮设置禁用状态。',
  centered: true,
  code,
};
