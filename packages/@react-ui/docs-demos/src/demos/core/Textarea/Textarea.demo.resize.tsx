import { Textarea } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Textarea } from '@react-ui/ui';

function Demo() {
  return <Textarea resize="vertical" label="已禁用" placeholder="你的评论" />;
}
`;

function Demo() {
  return <Textarea resize="vertical" label="已禁用" placeholder="你的评论" />;
}

export const resize: UIDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
  maxWidth: 340,
};
