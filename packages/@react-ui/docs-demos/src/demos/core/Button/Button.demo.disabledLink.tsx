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
  centered: true,
  code,
};
