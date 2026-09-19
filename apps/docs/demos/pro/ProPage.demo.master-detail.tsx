import { useState } from 'react';
import { Button, DataTableColumn, Descriptions, EmptyState, Group, Stack, Text } from '@xiaoye-react/ui';
import { PageContainer, ProTable } from '@xiaoye-react/pro';
import type { ProTableRequestParams } from '@xiaoye-react/pro';
import { UIDemo } from '@xiaoye-react/demo';

interface Member {
  id: string;
  name: string;
  department: string;
  city: string;
  onboard: string;
}

const db: Member[] = [
  { id: 'E-3001', name: '张伟', department: '研发部', city: '杭州', onboard: '2019-03-11' },
  { id: 'E-3002', name: '李静', department: '产品设计', city: '上海', onboard: '2020-07-01' },
  { id: 'E-3003', name: '王强', department: '研发部', city: '北京', onboard: '2018-11-26' },
  { id: 'E-3004', name: '赵敏', department: '市场部', city: '广州', onboard: '2021-05-17' },
  { id: 'E-3005', name: '陈晨', department: '人力资源', city: '深圳', onboard: '2022-02-28' },
  { id: 'E-3006', name: '刘洋', department: '研发部', city: '成都', onboard: '2020-09-14' },
  { id: 'E-3007', name: '杨帆', department: '产品设计', city: '杭州', onboard: '2019-12-02' },
  { id: 'E-3008', name: '黄蕾', department: '财务部', city: '上海', onboard: '2021-08-23' },
];

function fakeQuery(params: ProTableRequestParams) {
  const keyword = (params.search?.keyword as string)?.trim() ?? '';
  const filtered = db.filter(
    (item) => !keyword || item.name.includes(keyword) || item.department.includes(keyword)
  );
  const start = (params.page - 1) * params.pageSize;
  return Promise.resolve({
    records: filtered.slice(start, start + params.pageSize),
    total: filtered.length,
  });
}

const columns: DataTableColumn<Member>[] = [
  { accessor: 'name', title: '姓名', width: 100 },
  { accessor: 'department', title: '部门' },
];

const code = `
// 主从详情：点击列表行，右侧 Descriptions 展示选中记录的完整信息
// （演示中省略 fakeQuery 模拟接口的实现）

function Demo() {
  const [selected, setSelected] = useState<Member | null>(null);

  return (
    <PageContainer title="成员管理" subtitle="点击左侧列表查看详情">
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 16, alignItems: 'start' }}>
        <ProTable
          columns={columns}
          rowKey={(record) => record.id}
          request={fakeQuery}
          dataTableProps={{ onRowClick: setSelected, totalText: () => '', highlightOnHover: true }}
        />
        <div style={{ position: 'sticky', top: 16 }}>
          {selected ? (
            <Descriptions bordered columns={1}>
              <Descriptions.Item label="工号">{selected.id}</Descriptions.Item>
              <Descriptions.Item label="姓名">{selected.name}</Descriptions.Item>
              <Descriptions.Item label="部门">{selected.department}</Descriptions.Item>
              <Descriptions.Item label="城市">{selected.city}</Descriptions.Item>
              <Descriptions.Item label="入职日期">{selected.onboard}</Descriptions.Item>
            </Descriptions>
          ) : (
            <EmptyState title="未选择成员" description="点击左侧列表中的任意一行查看详情" />
          )}
        </div>
      </div>
    </PageContainer>
  );
}
`;

function Demo() {
    const [selected, setSelected] = useState<Member | null>(null);

    return (
        <PageContainer title="成员管理" subtitle="点击左侧列表查看详情">
            <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 16, alignItems: 'start' }}>
                <ProTable
                    columns={columns}
                    rowKey={record => record.id}
                    request={fakeQuery}
                    search={false}
                    dataTableProps={{ onRowClick: setSelected, totalText: () => '', highlightOnHover: true }}
                />
                <div style={{ position: 'sticky', top: 16 }}>
                    {selected ? (
                        <div>
                            <Group justify="space-between" mb="xs">
                                <Text fw={600}>成员详情</Text>
                                <Button size="compact-xs" variant="subtle" onClick={() => setSelected(null)}>
                                    清除
                                </Button>
                            </Group>
                            <Descriptions bordered columns={1}>
                                <Descriptions.Item label="工号">{selected.id}</Descriptions.Item>
                                <Descriptions.Item label="姓名">{selected.name}</Descriptions.Item>
                                <Descriptions.Item label="部门">{selected.department}</Descriptions.Item>
                                <Descriptions.Item label="城市">{selected.city}</Descriptions.Item>
                                <Descriptions.Item label="入职日期">{selected.onboard}</Descriptions.Item>
                            </Descriptions>
                        </div>
                    ) : (
                        <EmptyState title="未选择成员" description="点击左侧列表中的任意一行查看详情" />
                    )}
                </div>
            </div>
        </PageContainer>
    );
}

export const masterDetail: UIDemo = { type: 'code', code, component: Demo };
