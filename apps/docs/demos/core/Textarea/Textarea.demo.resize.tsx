import { Textarea } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Textarea } from '@xiaoye-react/ui';

function Demo() {
  return <Textarea style={{ resize: "none" }} label="已禁用" placeholder="你的评论" />;
}
`;

function Demo() {
  return <Textarea style={{ resize: "none" }} label="已禁用" placeholder="你的评论" />;
}

export const resize: UIDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
  maxWidth: 340,
};
