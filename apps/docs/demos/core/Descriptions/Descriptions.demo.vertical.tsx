import { Descriptions } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Descriptions } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Descriptions layout="vertical" columns={3}>
      <Descriptions.Item label="订单号">SO-20260910-001</Descriptions.Item>
      <Descriptions.Item label="下单时间">2026-09-10 14:32</Descriptions.Item>
      <Descriptions.Item label="金额">¥ 1,280.00</Descriptions.Item>
    </Descriptions>
  );
}
`;

function Demo() {
    return (
        <Descriptions layout="vertical" columns={3}>
            <Descriptions.Item label="订单号">SO-20260910-001</Descriptions.Item>
            <Descriptions.Item label="下单时间">2026-09-10 14:32</Descriptions.Item>
            <Descriptions.Item label="金额">¥ 1,280.00</Descriptions.Item>
        </Descriptions>
    );
}

export const vertical: UIDemo = { type: 'code', code, component: Demo };
