import { Button, Tooltip } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Tooltip, Button } from '@react-ui/ui';

function Demo() {
  return (
    <Tooltip
      multiline
      w={220}
      withArrow
      transitionProps={{ duration: 200 }}
      label="使用此按钮将信息保存到你的个人资料，之后你可以随时访问并通过邮件分享。"
    >
      <Button>多行提示</Button>
    </Tooltip>
  );
}
`;

export function Demo() {
  return (
    <Tooltip
      multiline
      w={220}
      withArrow
      transitionProps={{ duration: 200 }}
      label="使用此按钮将信息保存到你的个人资料，之后你可以随时访问并通过邮件分享。"
    >
      <Button>多行提示</Button>
    </Tooltip>
  );
}

export const multiline: UIDemo = {
  type: 'code',
  code,
  centered: true,
  component: Demo,
};
