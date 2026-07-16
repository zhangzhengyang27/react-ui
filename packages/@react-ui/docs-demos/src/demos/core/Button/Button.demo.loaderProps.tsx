import { Button } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Button } from '@react-ui/ui';

function Demo() {
  return (
    <Button loading loaderProps={{ type: 'dots' }}>
      加载按钮
    </Button>
  );
}
`;

function Demo() {
  return (
    <Button loading loaderProps={{ type: 'dots' }}>
      加载按钮
    </Button>
  );
}

export const loaderProps: UIDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
