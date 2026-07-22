import { Button } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Button } from '@xiaoye-react/ui';

function Demo() {
  return <Button fullWidth>全宽按钮</Button>;
}
`;

function Demo() {
  return <Button fullWidth>全宽按钮</Button>;
}

export const fullWidth: UIDemo = {
  type: 'code',
  component: Demo,
  title: '全宽按钮',
  description: 'fullWidth 属性使按钮占据父容器完整宽度。',
  code,
};
