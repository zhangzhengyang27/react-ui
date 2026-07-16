import { Highlight } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Highlight } from '@react-ui/ui';

function Demo() {
  return (
    <Highlight
      highlight={[
        { text: 'error', color: 'red' },
        { text: 'warning', color: 'yellow' },
        { text: 'success', color: 'green' },
      ]}
    >
      错误：输入无效。警告：请检查此字段。成功：所有测试通过。
    </Highlight>
  );
}
`;

function Demo() {
  return (
    <Highlight
      highlight={[
        { text: 'error', color: 'red' },
        { text: 'warning', color: 'yellow' },
        { text: 'success', color: 'green' },
      ]}
    >
      错误：输入无效。警告：请检查此字段。成功：所有测试通过。
    </Highlight>
  );
}

export const colors: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
