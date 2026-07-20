import { UnstyledButton } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { UnstyledButton } from '@react-ui/ui';

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
