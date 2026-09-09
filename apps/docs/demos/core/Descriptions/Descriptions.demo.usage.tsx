import { Descriptions } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Descriptions } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Descriptions>
      <Descriptions.Item label="组件名">DataTable</Descriptions.Item>
      <Descriptions.Item label="版本">1.1.0</Descriptions.Item>
      <Descriptions.Item label="协议">MIT</Descriptions.Item>
      <Descriptions.Item label="作者">xiaoye</Descriptions.Item>
      <Descriptions.Item label="依赖" span={2}>
        React 19 · TypeScript 5.5
      </Descriptions.Item>
    </Descriptions>
  );
}
`;

function Demo() {
    return (
        <Descriptions>
            <Descriptions.Item label="组件名">DataTable</Descriptions.Item>
            <Descriptions.Item label="版本">1.1.0</Descriptions.Item>
            <Descriptions.Item label="协议">MIT</Descriptions.Item>
            <Descriptions.Item label="作者">xiaoye</Descriptions.Item>
            <Descriptions.Item label="依赖" span={2}>
                React 19 · TypeScript 5.5
            </Descriptions.Item>
        </Descriptions>
    );
}

export const usage: UIDemo = { type: 'code', code, component: Demo };
