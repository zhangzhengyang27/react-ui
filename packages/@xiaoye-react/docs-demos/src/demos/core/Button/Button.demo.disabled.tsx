import { Button } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Button } from '@xiaoye-react/ui';

function Demo() {
  return <Button disabled>禁用按钮</Button>;
}
`;

function Demo() {
  return <Button disabled>禁用按钮</Button>;
}

export const disabled: UIDemo = {
  type: 'code',
  component: Demo,
  title: '禁用状态',
  description: '禁用按钮会阻止交互并降低视觉权重。',
  centered: true,
  code,
};
