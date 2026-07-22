import { Button } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Button } from '@xiaoye-react/ui';

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
  title: '加载指示器',
  description: '通过 loaderProps 自定义加载指示器类型。',
  centered: true,
  code,
};
