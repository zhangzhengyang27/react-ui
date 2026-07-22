import { JsonInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { JsonInput } from '@xiaoye-react/ui';

function Demo() {
  return (
    <JsonInput
      label="你的 package.json"
      placeholder="文本域将自动调整大小以适应内容"
      validationError="JSON 格式无效"
      formatOnBlur
      autosize
      minRows={4}
    />
  );
}
`;

function Demo() {
  return (
    <JsonInput
      maw={400}
      mx="auto"
      label="你的 package.json"
      placeholder="文本域将自动调整大小以适应内容"
      validationError="JSON 格式无效"
      formatOnBlur
      autosize
      minRows={4}
    />
  );
}

export const usage: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
