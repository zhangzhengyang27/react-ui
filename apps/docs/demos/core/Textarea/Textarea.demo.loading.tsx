import { Textarea } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Textarea } from '@react-ui/ui';

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
