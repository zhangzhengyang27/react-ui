import { TextInput } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { TextInput } from '@react-ui/ui';

function Demo() {
  return (
    <>
      <TextInput placeholder="成功状态为布尔值" label="成功状态为布尔值" success />
      <TextInput
        mt="md"
        placeholder="成功状态为 React 节点"
        label="成功状态为 React 节点"
        success="用户名可用"
      />
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <TextInput placeholder="成功状态为布尔值" label="成功状态为布尔值" success />
      <TextInput
        mt="md"
        placeholder="成功状态为 React 节点"
        label="成功状态为 React 节点"
        success="用户名可用"
      />
    </>
  );
}

export const success: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
