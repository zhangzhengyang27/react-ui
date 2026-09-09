import { Badge, Descriptions } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Descriptions, Badge } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Descriptions bordered columns={2} labelWidth={120}>
      <Descriptions.Item label="服务状态">运行中</Descriptions.Item>
      <Descriptions.Item label="可用区">华东 1</Descriptions.Item>
      <Descriptions.Item label="实例规格">ecs.c8.xlarge</Descriptions.Item>
      <Descriptions.Item label="健康检查">
        <Badge color="green">正常</Badge>
      </Descriptions.Item>
    </Descriptions>
  );
}
`;

function Demo() {
    return (
        <Descriptions bordered columns={2} labelWidth={120}>
            <Descriptions.Item label="服务状态">运行中</Descriptions.Item>
            <Descriptions.Item label="可用区">华东 1</Descriptions.Item>
            <Descriptions.Item label="实例规格">ecs.c8.xlarge</Descriptions.Item>
            <Descriptions.Item label="健康检查">
                <Badge color="green">正常</Badge>
            </Descriptions.Item>
        </Descriptions>
    );
}

export const bordered: UIDemo = { type: 'code', code, component: Demo };
