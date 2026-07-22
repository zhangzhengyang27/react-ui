import { Textarea } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Textarea } from '@xiaoye-react/ui';

function Demo() {
  return <Textarea placeholder="你的评论" loading />;
}
`;

function Demo() {
  return <Textarea placeholder="你的评论" loading />;
}

export const loading: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
