import { Textarea } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Textarea } from '@react-ui/ui';

function Demo() {
  return <Textarea label="文本域" placeholder="文本域" success="看起来不错！" />;
}
`;

function Demo() {
  return <Textarea label="文本域" placeholder="文本域" success="看起来不错！" />;
}

export const success: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
