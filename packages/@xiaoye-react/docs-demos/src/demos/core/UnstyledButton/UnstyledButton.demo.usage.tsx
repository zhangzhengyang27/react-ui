import { UnstyledButton } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { UnstyledButton } from '@xiaoye-react/ui';

function Demo() {
  return <UnstyledButton>无样式按钮</UnstyledButton>;
}
`;

function Demo() {
  return <UnstyledButton>无样式按钮</UnstyledButton>;
}

export const usage: UIDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
