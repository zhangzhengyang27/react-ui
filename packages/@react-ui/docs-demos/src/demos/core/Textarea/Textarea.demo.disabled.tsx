import { Textarea } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Textarea } from '@react-ui/ui';

function Demo() {
  return <Textarea label="已禁用" placeholder="你的评论" disabled />;
}
`;

function Demo() {
  return <Textarea label="已禁用" placeholder="你的评论" disabled />;
}

export const disabled: UIDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
  maxWidth: 340,
};
